import { useState } from "react";
import bgColors from "../utils/bgColors";
import quotes from "../utils/quotes";
import Color from "./Color";
import FancyText from "./FancyText";

export default function InspirationGenerator({ children }) {
  const [textDisplay, setTextDisplay] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  function getRandomIndex() {
    setTextDisplay((s) => !s);
    setRandomIndex(
      Math.floor(
        Math.random() * (textDisplay ? bgColors.length : quotes.length)
      )
    );
  }
  return (
    <>
      <p>Random Inspiration {textDisplay ? "Text" : "Color"}:</p>
      {textDisplay ? (
        <FancyText text={quotes[randomIndex]} />
      ) : (
        <Color value={bgColors[randomIndex]} />
      )}
      <button onClick={getRandomIndex} style={{ marginTop: "10px" }}>
        Again Random Inspried
      </button>
      {children}
    </>
  );
}
