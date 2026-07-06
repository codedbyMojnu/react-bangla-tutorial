import { motion } from "framer-motion";

export default function BasicAnimation() {
  return (
    <div
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p
        style={{ color: "#9ca3af", fontSize: 12, margin: 0, letterSpacing: 1 }}
      >
        PAGE LOAD ANIMATION
      </p>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 80,
          height: 80,
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          borderRadius: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          boxShadow: "0 16px 40px rgba(102,126,234,0.4)",
        }}
      >
        ✦
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        style={{ margin: 0, fontSize: 20, color: "#111", fontWeight: 800 }}
      >
        স্বাগতম! 👋
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          color: "#6b7280",
          textAlign: "center",
          margin: 0,
          fontSize: 13,
          lineHeight: 1.6,
          maxWidth: 260,
        }}
      >
        initial → animate দিয়ে এই fade + slide effect হচ্ছে। প্রতিটা element
        আলাদা delay-এ আসছে।
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: "10px 24px",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        শুরু করুন →
      </motion.button>
    </div>
  );
}
