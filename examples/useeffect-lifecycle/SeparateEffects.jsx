import React, { useEffect, useState } from "react";

function SeparateEffects() {
  const [roomId, setRoomId] = useState("general");
  const [serverUrl, setServerUrl] = useState("https://localhost:1234");

  // ✅ সঠিক উপায়: অ্যানালিটিক্সের জন্য আলাদা Effect
  useEffect(() => {
    console.log(`📊 Analytics: User visited ${roomId} room`);

    // Mock analytics call
    const logVisit = (room) => {
      console.log(`📈 Logged visit to ${room}`);
    };

    logVisit(roomId);
  }, [roomId]); // শুধু roomId বদলালে চলবে

  // ✅ সঠিক উপায়: কানেকশনের জন্য আলাদা Effect
  useEffect(() => {
    console.log(`🔗 Connection: Connecting to ${roomId} at ${serverUrl}`);

    const connection = {
      connect() {
        console.log(`✅ Connected to ${roomId} at ${serverUrl}`);
      },
      disconnect() {
        console.log(`❌ Disconnected from ${roomId}`);
      },
    };

    connection.connect();

    return () => {
      console.log(`🔄 Cleanup: Disconnecting from ${roomId}`);
      connection.disconnect();
    };
  }, [roomId, serverUrl]); // roomId বা serverUrl বদলালে চলবে

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Room ID:
          </label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          >
            <option value="general">General</option>
            <option value="travel">Travel</option>
            <option value="music">Music</option>
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
            Server URL:
          </label>
          <select
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "16px",
            }}
          >
            <option value="https://localhost:1234">localhost:1234</option>
            <option value="https://localhost:5678">localhost:5678</option>
          </select>
        </div>
      </div>

      <div
        style={{
          padding: "15px",
          border: "2px solid #10b981",
          borderRadius: "8px",
          backgroundColor: "#ecfdf5",
        }}
      >
        <h3 style={{ color: "#047857", margin: "0 0 10px 0" }}>
          Current Connection 🔗
        </h3>
        <p style={{ margin: "5px 0" }}>
          Room: <strong>{roomId}</strong>
        </p>
        <p style={{ margin: "5px 0" }}>
          Server: <strong>{serverUrl}</strong>
        </p>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f9fafb",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        <strong>পরীক্ষা করুন:</strong>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>শুধু Room ID বদলালে: Analytics + Connection দুটোই চলবে</li>
          <li>শুধু Server URL বদলালে: শুধু Connection চলবে</li>
        </ul>
        Console দেখুন বিস্তারিত লগ দেখতে।
      </div>
    </div>
  );
}

export default SeparateEffects;
