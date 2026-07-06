import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SECTIONS = [
  {
    icon: "🚀",
    title: "Hero Section",
    color: "#ede9fe",
    body: "প্রথম screen-এ আপনার মূল message। Strong headline, subtext এবং একটা CTA button রাখুন।",
  },
  {
    icon: "✨",
    title: "Features",
    color: "#dbeafe",
    body: "৩–৬টি key feature। Icon + short description। Grid বা alternate layout ব্যবহার করুন।",
  },
  {
    icon: "💬",
    title: "Social Proof",
    color: "#dcfce7",
    body: "Real user testimonials বা client logos। Trust তৈরি করতে এটা সবচেয়ে কার্যকর।",
  },
  {
    icon: "💰",
    title: "Pricing",
    color: "#fef3c7",
    body: "সর্বোচ্চ ৩টি plan। Most popular plan highlight করুন। Annual/monthly toggle রাখুন।",
  },
  {
    icon: "🎯",
    title: "Call to Action",
    color: "#fce7f3",
    body: "Final conversion section। Strong headline + benefit + button। Simple রাখুন।",
  },
];

export default function ScrollProgress() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* Scroll container */}
      <div
        ref={containerRef}
        style={{
          height: 420,
          overflowY: "scroll",
          scrollbarWidth: "thin",
          scrollbarColor: "#e5e7eb transparent",
        }}
      >
        {/* Sticky header with progress bar */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>
              📄 Landing Page Blueprint
            </span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>scroll ↓</span>
          </div>
          {/* Progress bar */}
          <motion.div
            style={{
              height: 3,
              background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb)",
              transformOrigin: "left center",
              scaleX,
            }}
          />
        </div>

        {/* Sections */}
        <div style={{ padding: "16px 20px 32px" }}>
          {SECTIONS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, root: containerRef }}
              transition={{
                delay: 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ x: 4 }}
              style={{
                marginBottom: 14,
                padding: "16px 18px",
                background: s.color,
                borderRadius: 14,
                cursor: "default",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 7,
                }}
              >
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#111",
                    margin: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} — {s.title}
                </p>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#555",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
