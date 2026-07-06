import { motion } from "framer-motion";

export default function SpringAnimation() {
  return (
    <div
      style={{
        padding: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Bouncing loader */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: "#9ca3af",
            fontSize: 11,
            letterSpacing: 1,
            marginBottom: 14,
          }}
        >
          BOUNCING DOTS
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {["#667eea", "#f093fb", "#4facfe"].map((color, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -18, 0] }}
              transition={{
                duration: 0.55,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.14,
              }}
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: color,
              }}
            />
          ))}
        </div>
      </div>

      {/* Pulse ring */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: "#9ca3af",
            fontSize: 11,
            letterSpacing: 1,
            marginBottom: 14,
          }}
        >
          PULSE RING
        </p>
        <div
          style={{
            position: "relative",
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#667eea",
            }}
          />
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              position: "relative",
              color: "white",
            }}
          >
            🔔
          </div>
        </div>
      </div>

      {/* Spinner */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            color: "#9ca3af",
            fontSize: 11,
            letterSpacing: 1,
            marginBottom: 14,
          }}
        >
          SPINNER
        </p>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "3.5px solid #e5e7eb",
            borderTopColor: "#667eea",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );
}
