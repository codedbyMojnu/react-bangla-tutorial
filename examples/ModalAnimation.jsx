import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ModalAnimation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        padding: 32,
        display: "flex",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: "12px 28px",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          color: "white",
          border: "none",
          borderRadius: 10,
          fontWeight: 600,
          fontSize: 15,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(102,126,234,0.35)",
        }}
      >
        Modal খুলুন ✨
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(4px)",
                zIndex: 40,
              }}
            />
            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                borderRadius: 20,
                padding: 28,
                width: 320,
                zIndex: 50,
                boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                style={{
                  fontSize: 40,
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                🗑️
              </motion.div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 17,
                  color: "#111",
                  textAlign: "center",
                }}
              >
                নিশ্চিত করুন
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: 13,
                  margin: "0 0 24px",
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                আপনি কি সত্যিই এই ফাইলটি মুছে ফেলতে চান? এটা পূর্বাবস্থায়
                ফেরানো যাবে না।
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 10,
                    background: "white",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: 14,
                    color: "#374151",
                  }}
                >
                  বাতিল
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    border: "none",
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  মুছে ফেলুন
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
