import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TOAST_TYPES = {
  success: {
    bg: "#f0fdf4",
    border: "#bbf7d0",
    color: "#166534",
    icon: "✅",
    label: "সফল হয়েছে!",
  },
  error: {
    bg: "#fff1f2",
    border: "#fecdd3",
    color: "#9f1239",
    icon: "❌",
    label: "ত্রুটি ঘটেছে!",
  },
  info: {
    bg: "#eff6ff",
    border: "#bfdbfe",
    color: "#1e40af",
    icon: "ℹ️",
    label: "জানা দরকার",
  },
  warning: {
    bg: "#fffbeb",
    border: "#fde68a",
    color: "#92400e",
    icon: "⚠️",
    label: "সতর্ক থাকুন",
  },
};

export default function ToastAnimation() {
  const [toasts, setToasts] = useState([]);

  const addToast = (type) => {
    const id = Date.now();
    setToasts((prev) =>
      [{ id, type, ...TOAST_TYPES[type] }, ...prev].slice(0, 5),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const remove = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        minHeight: 200,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#6b7280",
          marginBottom: 16,
        }}
      >
        Button চাপুন → toast দেখুন
      </p>

      {/* Trigger buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
        }}
      >
        {Object.keys(TOAST_TYPES).map((type) => (
          <motion.button
            key={type}
            onClick={() => addToast(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            style={{
              padding: "8px 16px",
              borderRadius: 9,
              border: `1.5px solid ${TOAST_TYPES[type].border}`,
              background: TOAST_TYPES[type].bg,
              color: TOAST_TYPES[type].color,
              fontWeight: 600,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {TOAST_TYPES[type].icon} {type}
          </motion.button>
        ))}
      </div>

      {/* Toast stack — bottom right */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 999,
          maxWidth: 300,
        }}
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.88 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={() => remove(toast.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "12px 14px",
                background: toast.bg,
                border: `1.5px solid ${toast.border}`,
                borderRadius: 14,
                boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>{toast.icon}</span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: toast.color,
                    margin: 0,
                  }}
                >
                  {toast.label}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: toast.color,
                    opacity: 0.75,
                    margin: "2px 0 0",
                  }}
                >
                  Click করে বন্ধ করুন
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
