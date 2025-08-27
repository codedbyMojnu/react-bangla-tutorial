import React, { useEffect } from "react";

// একটি সিম্পল চ্যাটরুম কম্পোনেন্ট
function BasicChatRoom({ roomId }) {
  useEffect(() => {
    // কাজ শুরু: সার্ভারের সাথে কানেক্ট করা
    console.log(`✅ Connecting to "${roomId}" room...`);

    // একটি mock connection object
    const connection = {
      connect() {
        console.log(`🔗 Connected to ${roomId}`);
      },
      disconnect() {
        console.log(`❌ Disconnected from ${roomId}`);
      },
    };

    connection.connect();

    // কাজ বন্ধ: সার্ভার থেকে ডিসকানেক্ট করা
    return () => {
      console.log(`🔄 Cleaning up connection to "${roomId}"...`);
      connection.disconnect();
    };
  }, [roomId]); // এই Effect-টি roomId-এর উপর নির্ভরশীল

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #3b82f6",
        borderRadius: "8px",
        backgroundColor: "#eff6ff",
      }}
    >
      <h2 style={{ color: "#1e40af", margin: "0 0 10px 0" }}>
        Welcome to the {roomId} room! 🏠
      </h2>
      <p style={{ color: "#374151", margin: 0 }}>
        Console দেখুন connection এর লগ দেখতে
      </p>
    </div>
  );
}

export default BasicChatRoom;
