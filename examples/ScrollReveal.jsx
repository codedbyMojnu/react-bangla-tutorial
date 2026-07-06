import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: "⚡",
    title: "GPU Accelerated",
    desc: "60fps animation, zero jank।",
    color: "#fef3c7",
  },
  {
    icon: "🎨",
    title: "সহজ API",
    desc: "initial, animate, transition — তিনটা prop-ই যথেষ্ট।",
    color: "#ede9fe",
  },
  {
    icon: "📱",
    title: "Gesture Support",
    desc: "hover, tap, drag — সব built-in।",
    color: "#dbeafe",
  },
  {
    icon: "🔁",
    title: "AnimatePresence",
    desc: "Mount/unmount-এ smooth exit animation।",
    color: "#dcfce7",
  },
  {
    icon: "📜",
    title: "Scroll-linked",
    desc: "useScroll দিয়ে parallax, progress bar।",
    color: "#fce7f3",
  },
  {
    icon: "🧩",
    title: "Variants",
    desc: "Parent-child stagger orchestration।",
    color: "#f0fdf4",
  },
];

export default function ScrollReveal() {
  return (
    <div style={{ padding: "16px 18px", fontFamily: "system-ui, sans-serif" }}>
      <motion.p
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 15,
          color: "#111",
          marginBottom: 16,
        }}
      >
        কেন Framer Motion? 🤔
      </motion.p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.07,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}
            style={{
              padding: 14,
              background: f.color,
              borderRadius: 14,
              cursor: "default",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
            <p
              style={{
                fontWeight: 700,
                fontSize: 12,
                color: "#111",
                margin: "0 0 4px",
              }}
            >
              {f.title}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#555",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
