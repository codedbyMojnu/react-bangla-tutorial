import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TABS = [
  {
    id: "home",
    icon: "🏠",
    label: "Home",
    content: {
      heading: "ড্যাশবোর্ড",
      body: "আজকের summary, সাম্প্রতিক activities এবং quick actions এখানে দেখানো হয়। এই section-এ hero content, stats এবং overview cards রাখুন।",
      color: "#ede9fe",
    },
  },
  {
    id: "explore",
    icon: "🔍",
    label: "Explore",
    content: {
      heading: "অন্বেষণ করুন",
      body: "নতুন content, trending topics এবং recommended items এখানে থাকে। Discovery-based UI-তে এই pattern সবচেয়ে বেশি ব্যবহার হয়।",
      color: "#dbeafe",
    },
  },
  {
    id: "profile",
    icon: "👤",
    label: "Profile",
    content: {
      heading: "আপনার প্রোফাইল",
      body: "User তথ্য, avatar, bio এবং settings এখানে। Account management এবং personalization options রাখুন এই section-এ।",
      color: "#dcfce7",
    },
  },
];

export default function TabAnimation() {
  const [active, setActive] = useState("home");

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 380,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Pill tab bar */}
      <div
        style={{
          display: "flex",
          background: "#f3f4f6",
          borderRadius: 14,
          padding: 4,
          gap: 3,
          marginBottom: 16,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              flex: 1,
              padding: "9px 6px",
              border: "none",
              background: "transparent",
              borderRadius: 11,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              position: "relative",
              color: active === tab.id ? "#111" : "#9ca3af",
              transition: "color 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {active === tab.id && (
              <motion.div
                layoutId="tab-pill"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "white",
                  borderRadius: 11,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{tab.icon}</span>
            <span style={{ position: "relative", zIndex: 1 }}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content with AnimatePresence */}
      <AnimatePresence mode="wait">
        {TABS.map(
          (tab) =>
            tab.id === active && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  padding: 20,
                  background: tab.content.color,
                  borderRadius: 16,
                  minHeight: 120,
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#111",
                    margin: "0 0 8px",
                  }}
                >
                  {tab.icon} {tab.content.heading}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#374151",
                    margin: 0,
                    lineHeight: 1.65,
                  }}
                >
                  {tab.content.body}
                </p>
              </motion.div>
            ),
        )}
      </AnimatePresence>

      {/* Bottom nav example */}
      <div
        style={{
          marginTop: 24,
          padding: "12px 8px",
          background: "white",
          borderRadius: 16,
          boxShadow: "0 -2px 16px rgba(0,0,0,0.06)",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {TABS.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            whileTap={{ scale: 0.85 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <motion.span
              animate={{
                scale: active === tab.id ? 1.25 : 1,
                filter:
                  active === tab.id ? "none" : "grayscale(1) opacity(0.5)",
              }}
              style={{ fontSize: 22 }}
            >
              {tab.icon}
            </motion.span>
            {active === tab.id && (
              <motion.div
                layoutId="nav-dot"
                style={{
                  width: 4,
                  height: 4,
                  background: "#667eea",
                  borderRadius: "50%",
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
