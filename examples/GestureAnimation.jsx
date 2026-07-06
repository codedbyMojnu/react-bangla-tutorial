import { motion } from "framer-motion";
import { useState } from "react";

export default function GestureAnimation() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p
        style={{ color: "#9ca3af", fontSize: 12, margin: 0, letterSpacing: 1 }}
      >
        HOVER & TAP
      </p>

      {/* Primary CTA */}
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 16px 40px rgba(102,126,234,0.45)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          padding: "13px 32px",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          border: "none",
          borderRadius: 12,
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(102,126,234,0.35)",
        }}
      >
        Get Started →
      </motion.button>

      {/* Like + Save row */}
      <div style={{ display: "flex", gap: 10 }}>
        <motion.button
          onClick={() => setLiked(!liked)}
          whileTap={{ scale: 0.85 }}
          animate={liked ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 18px",
            background: liked ? "#fee2e2" : "#f3f4f6",
            color: liked ? "#ef4444" : "#6b7280",
            border: "none",
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          <motion.span
            animate={{ rotate: liked ? [0, -20, 20, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            {liked ? "❤️" : "🤍"}
          </motion.span>
          {liked ? "Liked" : "Like"}
        </motion.button>

        <motion.button
          onClick={() => setSaved(!saved)}
          whileTap={{ scale: 0.85 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 18px",
            background: saved ? "#ede9fe" : "#f3f4f6",
            color: saved ? "#7c3aed" : "#6b7280",
            border: "none",
            borderRadius: 999,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {saved ? "🔖" : "📄"} {saved ? "Saved" : "Save"}
        </motion.button>
      </div>

      {/* Icon button */}
      <motion.button
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 500 }}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#f3f4f6",
          border: "none",
          fontSize: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ⚙️
      </motion.button>
    </div>
  );
}
