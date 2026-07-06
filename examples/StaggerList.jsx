import { motion } from "framer-motion";

const NOTIFICATIONS = [
  {
    icon: "💬",
    title: "নতুন মেসেজ",
    msg: "Rafiq তোমাকে message করেছে",
    time: "এইমাত্র",
    bg: "#ede9fe",
  },
  {
    icon: "🔔",
    title: "নতুন অর্ডার",
    msg: "Order #1042 placed successfully",
    time: "২ মিনিট",
    bg: "#dbeafe",
  },
  {
    icon: "✅",
    title: "Deploy সফল",
    msg: "Production deploy সম্পন্ন হয়েছে",
    time: "৫ মিনিট",
    bg: "#dcfce7",
  },
  {
    icon: "⚠️",
    title: "সতর্কবার্তা",
    msg: "Server CPU 85% এ পৌঁছেছে",
    time: "১০ মিনিট",
    bg: "#fef3c7",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, x: -20, scale: 0.97 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

export default function StaggerList() {
  return (
    <div
      style={{
        padding: 20,
        maxWidth: 360,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p
        style={{
          fontWeight: 700,
          fontSize: 14,
          color: "#111",
          margin: "0 0 14px",
        }}
      >
        🔔 Notifications
      </p>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: "flex", flexDirection: "column", gap: 9 }}
      >
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ x: 4 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 13px",
              borderRadius: 13,
              background: n.bg,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 20 }}>{n.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  margin: 0,
                  color: "#111",
                }}
              >
                {n.title}
              </p>
              <p
                style={{
                  fontSize: 11,
                  margin: "2px 0 0",
                  color: "#555",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {n.msg}
              </p>
            </div>
            <span
              style={{
                fontSize: 10,
                color: "#9ca3af",
                flexShrink: 0,
                fontWeight: 500,
              }}
            >
              {n.time}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
