import { motion } from "framer-motion";

const PROJECTS = [
  {
    icon: "🛒",
    title: "E-Commerce Platform",
    desc: "React + Node.js দিয়ে বানানো full-stack online shop।",
    tags: ["React", "Node.js", "MongoDB"],
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    stat: "12k users",
  },
  {
    icon: "🌤️",
    title: "Weather Dashboard",
    desc: "Real-time weather data এবং 7-day forecast সহ।",
    tags: ["React", "REST API", "Chart.js"],
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    stat: "5 cities",
  },
  {
    icon: "✅",
    title: "Task Manager",
    desc: "Drag & drop Kanban board — team productivity tool।",
    tags: ["React", "DnD Kit", "Firebase"],
    gradient: "linear-gradient(135deg, #43e97b, #38f9d7)",
    stat: "3 boards",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "Sales, users এবং revenue-এর interactive charts।",
    tags: ["Next.js", "Recharts", "Prisma"],
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    stat: "$48k MRR",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CardHover() {
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p
        style={{
          fontWeight: 700,
          fontSize: 15,
          color: "#111",
          margin: "0 0 16px",
        }}
      >
        🚀 Projects
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {PROJECTS.map((p, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -3,
              boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
            }}
            style={{
              background: "white",
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              cursor: "pointer",
            }}
          >
            {/* Gradient accent bar */}
            <motion.div
              whileHover={{ width: 8 }}
              style={{
                width: 5,
                background: p.gradient,
                flexShrink: 0,
                transition: "width 0.2s ease",
              }}
            />

            <div style={{ padding: "14px 16px", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{p.icon}</span>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#111",
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    fontWeight: 500,
                    background: "#f3f4f6",
                    padding: "2px 8px",
                    borderRadius: 999,
                  }}
                >
                  {p.stat}
                </span>
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  margin: "0 0 10px",
                  lineHeight: 1.5,
                }}
              >
                {p.desc}
              </p>

              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {p.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.08 }}
                    style={{
                      padding: "2px 9px",
                      background: "#f3f4f6",
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
