import React, { useEffect, useState } from "react";

function ReactiveValues() {
  // Props এর বদলে state ব্যবহার করছি demo এর জন্য
  const [roomId, setRoomId] = useState("general");
  const [theme, setTheme] = useState("dark");
  const [isOnline, setIsOnline] = useState(true);

  // Component এর ভেতরে তৈরি ভ্যারিয়েবল (reactive value)
  const connectionConfig = {
    url: `wss://chat-${theme}.example.com`,
    room: roomId,
    status: isOnline ? "online" : "offline",
  };

  useEffect(() => {
    console.log("🔄 Effect running with config:", connectionConfig);

    // Mock connection
    const connection = {
      connect() {
        console.log(
          `✅ Connecting to ${connectionConfig.url}/${connectionConfig.room}`
        );
        console.log(`👤 Status: ${connectionConfig.status}`);
      },
      disconnect() {
        console.log(`❌ Disconnecting from ${connectionConfig.room}`);
      },
    };

    connection.connect();

    return () => {
      connection.disconnect();
    };
  }, [roomId, theme, isOnline]); // সব reactive values dependency তে আছে

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ color: "#1f2937", marginBottom: "20px" }}>
        Reactive Values Demo 🔄
      </h3>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Room ID (State):
          </label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
            }}
          >
            <option value="general">General</option>
            <option value="random">Random</option>
            <option value="help">Help</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Theme (State):
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
            }}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              checked={isOnline}
              onChange={(e) => setIsOnline(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Online Status (State)
          </label>
        </div>
      </div>

      <div
        style={{
          padding: "15px",
          border: "2px solid #8b5cf6",
          borderRadius: "8px",
          backgroundColor: "#f5f3ff",
        }}
      >
        <h4 style={{ color: "#7c3aed", margin: "0 0 10px 0" }}>
          Current Connection Config:
        </h4>
        <pre
          style={{
            backgroundColor: "#1f2937",
            color: "#e5e7eb",
            padding: "10px",
            borderRadius: "4px",
            fontSize: "14px",
            margin: 0,
            overflow: "auto",
          }}
        >
          {JSON.stringify(connectionConfig, null, 2)}
        </pre>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#fef3c7",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#92400e",
          border: "1px solid #fbbf24",
        }}
      >
        <strong>⚠️ গুরুত্বপূর্ণ:</strong> useEffect এর ভেতরে যেকোনো reactive
        value (state, props, বা তাদের থেকে তৈরি ভ্যারিয়েবল) ব্যবহার করলে সেগুলো
        dependency array তে রাখতে হবে। নাহলে Effect পুরোনো মান ব্যবহার করবে।
      </div>
    </div>
  );
}

export default ReactiveValues;
