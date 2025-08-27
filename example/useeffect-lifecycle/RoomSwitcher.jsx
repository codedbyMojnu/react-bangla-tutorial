import React, { useState } from "react";
import BasicChatRoom from "./BasicChatRoom";

function RoomSwitcher() {
  const [roomId, setRoomId] = useState("general");

  const rooms = ["general", "travel", "music", "programming"];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "10px",
            fontWeight: "bold",
            color: "#374151",
          }}
        >
          চ্যাট রুম সিলেক্ট করুন:
        </label>
        <select
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={{
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "16px",
            backgroundColor: "white",
          }}
        >
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room.charAt(0).toUpperCase() + room.slice(1)} Room
            </option>
          ))}
        </select>
      </div>

      <BasicChatRoom roomId={roomId} />

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
        <strong>পরীক্ষা করুন:</strong> ড্রপডাউন থেকে রুম পরিবর্তন করে console
        দেখুন। React পুরোনো রুম থেকে disconnect করে নতুন রুমে connect করবে।
      </div>
    </div>
  );
}

export default RoomSwitcher;
