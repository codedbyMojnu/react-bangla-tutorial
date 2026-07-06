import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function FormAnimation() {
  const [step, setStep] = useState("form"); // form | loading | success
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailError("সঠিক email address দিন");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStep("loading");
    setTimeout(() => setStep("success"), 2200);
  };

  return (
    <div
      style={{
        padding: 24,
        display: "flex",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 320,
          background: "white",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <AnimatePresence mode="wait">
          {/* ── FORM STATE ── */}
          {step === "form" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    color: "#111",
                    fontWeight: 700,
                  }}
                >
                  ✉️ Newsletter
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: 13,
                    margin: "6px 0 0",
                    lineHeight: 1.5,
                  }}
                >
                  সাপ্তাহিক React tips পান। Unsubscribe যেকোনো সময়।
                </p>
              </div>

              {/* Email field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  Email Address
                </label>
                <motion.input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="you@example.com"
                  animate={emailError ? { x: [-6, 6, -4, 4, 0] } : {}}
                  transition={{ duration: 0.35 }}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: `1.5px solid ${emailError ? "#ef4444" : "#e5e7eb"}`,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                />
                <AnimatePresence>
                  {emailError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        color: "#ef4444",
                        fontSize: 12,
                        margin: "5px 0 0",
                        fontWeight: 500,
                      }}
                    >
                      ⚠️ {emailError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "12px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(102,126,234,0.35)",
                }}
              >
                Subscribe করুন →
              </motion.button>
            </motion.form>
          )}

          {/* ── LOADING STATE ── */}
          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{ textAlign: "center", padding: "32px 0" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 44,
                  height: 44,
                  margin: "0 auto 16px",
                  borderRadius: "50%",
                  border: "3px solid #e5e7eb",
                  borderTopColor: "#667eea",
                }}
              />
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
                Subscribe হচ্ছে...
              </p>
            </motion.div>
          )}

          {/* ── SUCCESS STATE ── */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "12px 0" }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 380,
                  damping: 20,
                }}
                style={{ fontSize: 52, marginBottom: 14 }}
              >
                🎉
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ margin: "0 0 8px", color: "#111", fontSize: 18 }}
              >
                সফল হয়েছে!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{
                  color: "#6b7280",
                  fontSize: 13,
                  margin: "0 0 20px",
                  lineHeight: 1.6,
                }}
              >
                <strong>{email}</strong> — subscribe করা হয়েছে।
              </motion.p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStep("form");
                  setEmail("");
                }}
                style={{
                  padding: "9px 22px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 9,
                  background: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#374151",
                }}
              >
                আবার করুন
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
