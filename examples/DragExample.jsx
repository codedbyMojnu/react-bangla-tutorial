import { motion } from "framer-motion";

const CARDS = [
  {
    icon: "🎯",
    title: "Design",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  {
    icon: "💡",
    title: "Build",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
  },
  {
    icon: "🚀",
    title: "Launch",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
  },
];

export default function DragExample() {
  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p
        style={{ color: "#9ca3af", fontSize: 12, margin: 0, letterSpacing: 1 }}
      >
        DRAG CARDS
      </p>
      <div style={{ position: "relative", width: 200, height: 160 }}>
        {CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            drag
            dragConstraints={{ top: -80, left: -80, right: 80, bottom: 80 }}
            dragElastic={0.08}
            whileDrag={{
              scale: 1.12,
              zIndex: 10,
              boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
              cursor: "grabbing",
            }}
            whileHover={{ scale: 1.04 }}
            style={{
              position: "absolute",
              top: i * 12,
              left: i * 12,
              width: 148,
              height: 110,
              background: card.gradient,
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "grab",
              color: "white",
              userSelect: "none",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            <span style={{ fontSize: 28, marginBottom: 6 }}>{card.icon}</span>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{card.title}</span>
          </motion.div>
        ))}
      </div>
      <p style={{ color: "#d1d5db", fontSize: 11, margin: 0 }}>
        cards সরান — snap back হবে
      </p>
    </div>
  );
}
