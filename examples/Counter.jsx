import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

function StatCard({ value, label, prefix, suffix, color }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, value, { duration: 2.2, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.1)" }}
      style={{
        background: color,
        borderRadius: 16,
        padding: "20px 12px",
        textAlign: "center",
        flex: 1,
      }}
    >
      <p style={{ fontSize: 26, fontWeight: 800, color: "#111", margin: 0 }}>
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </p>
      <p
        style={{
          fontSize: 11,
          color: "#6b7280",
          margin: "4px 0 0",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}

export default function Counter() {
  return (
    <div
      style={{
        padding: 24,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p
        style={{
          fontWeight: 700,
          fontSize: 14,
          color: "#111",
          textAlign: "center",
          margin: "0 0 16px",
        }}
      >
        📊 আমাদের সাফল্য
      </p>
      <div style={{ display: "flex", gap: 10 }}>
        <StatCard
          value={12400}
          label="Active Users"
          color="#ede9fe"
          suffix="+"
        />
        <StatCard value={98} label="Satisfaction" color="#dcfce7" suffix="%" />
        <StatCard
          value={5}
          label="Awards"
          color="#fef3c7"
          prefix="🏆"
          suffix=""
        />
      </div>
    </div>
  );
}
