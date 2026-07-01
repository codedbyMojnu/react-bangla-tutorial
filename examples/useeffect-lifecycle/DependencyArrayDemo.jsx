import React, { useEffect, useState } from "react";

function DependencyArrayDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [color, setColor] = useState("blue");

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ color: "#1f2937", marginBottom: "20px" }}>
        Dependency Array এর প্রভাব 🎯
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Count: {count}
          </label>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Increment Count
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              width: "200px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Color:
          </label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
            }}
          >
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <EffectWithEmptyDeps count={count} name={name} color={color} />
        <EffectWithCountDep count={count} name={name} color={color} />
        <EffectWithNameDep count={count} name={name} color={color} />
        <EffectWithAllDeps count={count} name={name} color={color} />
      </div>
    </div>
  );
}

function EffectWithEmptyDeps({ count, name, color }) {
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    console.log("🔵 Empty deps effect ran");
    setRunCount((prev) => prev + 1);
  }, []); // Empty dependency array

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid #6b7280",
        borderRadius: "8px",
        backgroundColor: "#f9fafb",
      }}
    >
      <h4 style={{ color: "#374151", margin: "0 0 10px 0", fontSize: "14px" }}>
        Empty Dependencies []
      </h4>
      <p style={{ margin: "5px 0", fontSize: "12px" }}>Run count: {runCount}</p>
      <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>
        শুধু mount এ একবার চলে
      </p>
    </div>
  );
}

function EffectWithCountDep({ count, name, color }) {
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    console.log("🟢 Count dependency effect ran, count:", count);
    setRunCount((prev) => prev + 1);
  }, [count]); // শুধু count dependency

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid #10b981",
        borderRadius: "8px",
        backgroundColor: "#ecfdf5",
      }}
    >
      <h4 style={{ color: "#047857", margin: "0 0 10px 0", fontSize: "14px" }}>
        Count Dependency [count]
      </h4>
      <p style={{ margin: "5px 0", fontSize: "12px" }}>Run count: {runCount}</p>
      <p style={{ margin: 0, fontSize: "12px", color: "#065f46" }}>
        count বদলালে চলে
      </p>
    </div>
  );
}

function EffectWithNameDep({ count, name, color }) {
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    console.log("🟡 Name dependency effect ran, name:", name);
    setRunCount((prev) => prev + 1);
  }, [name]); // শুধু name dependency

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid #f59e0b",
        borderRadius: "8px",
        backgroundColor: "#fffbeb",
      }}
    >
      <h4 style={{ color: "#d97706", margin: "0 0 10px 0", fontSize: "14px" }}>
        Name Dependency [name]
      </h4>
      <p style={{ margin: "5px 0", fontSize: "12px" }}>Run count: {runCount}</p>
      <p style={{ margin: 0, fontSize: "12px", color: "#92400e" }}>
        name বদলালে চলে
      </p>
    </div>
  );
}

function EffectWithAllDeps({ count, name, color }) {
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    console.log("🔴 All deps effect ran:", { count, name, color });
    setRunCount((prev) => prev + 1);
  }, [count, name, color]); // সব dependencies

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid #ef4444",
        borderRadius: "8px",
        backgroundColor: "#fef2f2",
      }}
    >
      <h4 style={{ color: "#dc2626", margin: "0 0 10px 0", fontSize: "14px" }}>
        All Dependencies [count, name, color]
      </h4>
      <p style={{ margin: "5px 0", fontSize: "12px" }}>Run count: {runCount}</p>
      <p style={{ margin: 0, fontSize: "12px", color: "#991b1b" }}>
        যেকোনো কিছু বদলালে চলে
      </p>
    </div>
  );
}

export default DependencyArrayDemo;
