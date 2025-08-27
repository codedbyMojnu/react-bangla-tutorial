import React, { useEffect, useState } from "react";

function CleanupDemo() {
  const [showTimer, setShowTimer] = useState(false);
  const [showEventListener, setShowEventListener] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ color: "#1f2937", marginBottom: "20px" }}>
        Cleanup Function Demo 🧹
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setShowTimer(!showTimer)}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: showTimer ? "#ef4444" : "#10b981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {showTimer ? "Stop Timer" : "Start Timer"}
        </button>

        <button
          onClick={() => setShowEventListener(!showEventListener)}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: showEventListener ? "#ef4444" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {showEventListener ? "Remove Event Listener" : "Add Event Listener"}
        </button>
      </div>

      {showTimer && <Timer />}
      {showEventListener && <WindowResizeListener />}

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f0f9ff",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#0c4a6e",
          border: "1px solid #0ea5e9",
        }}
      >
        <strong>💡 Cleanup এর গুরুত্ব:</strong>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>Timer, Interval বন্ধ করা</li>
          <li>Event Listener remove করা</li>
          <li>Network request cancel করা</li>
          <li>Subscription unsubscribe করা</li>
        </ul>
        Cleanup না করলে memory leak হতে পারে!
      </div>
    </div>
  );
}

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("⏰ Timer started");

    const interval = setInterval(() => {
      setCount((prev) => {
        const newCount = prev + 1;
        console.log(`⏰ Timer tick: ${newCount}`);
        return newCount;
      });
    }, 1000);

    // Cleanup: interval বন্ধ করা
    return () => {
      console.log("🛑 Timer cleanup: clearing interval");
      clearInterval(interval);
    };
  }, []); // Empty dependency - শুধু mount/unmount এ চলবে

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid #f59e0b",
        borderRadius: "8px",
        backgroundColor: "#fffbeb",
        marginBottom: "10px",
      }}
    >
      <h4 style={{ color: "#d97706", margin: "0 0 10px 0" }}>
        Timer Component ⏰
      </h4>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#92400e",
          margin: 0,
        }}
      >
        Count: {count}
      </p>
    </div>
  );
}

function WindowResizeListener() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    console.log("👂 Window resize listener added");

    const handleResize = () => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      console.log("📐 Window resized:", newSize);
      setWindowSize(newSize);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup: event listener remove করা
    return () => {
      console.log("🗑️ Cleanup: removing resize listener");
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid #8b5cf6",
        borderRadius: "8px",
        backgroundColor: "#f5f3ff",
        marginBottom: "10px",
      }}
    >
      <h4 style={{ color: "#7c3aed", margin: "0 0 10px 0" }}>
        Window Resize Listener 📐
      </h4>
      <p style={{ color: "#6b21a8", margin: 0 }}>
        Window Size: {windowSize.width} x {windowSize.height}
      </p>
      <p style={{ fontSize: "12px", color: "#9333ea", margin: "5px 0 0 0" }}>
        Browser window resize করে দেখুন!
      </p>
    </div>
  );
}

export default CleanupDemo;
