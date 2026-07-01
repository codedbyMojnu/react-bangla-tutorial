import Copyright from "./components/Copyright";
import FancyText from "./components/FancyText";
import InspirationGenerator from "./components/InspirationGenerator";
import "./index.css";

export default function App() {
  return (
    <div>
      <FancyText title text="Random Inspiration App" />
      <InspirationGenerator>
        <Copyright year={2025} />
      </InspirationGenerator>
    </div>
  );
}
