import { motion } from "framer-motion";

export default function GestureAnimation() {
  return (
    <motion.button
      style={{
        padding: "16px 32px",
        background: "#111827",
        color: "#fff",
        borderRadius: 8,
        fontWeight: "bold",
        border: "none",
        fontSize: 18,
      }}
      whileHover={{ scale: 1.1, rotate: 3 }}
      whileTap={{ scale: 0.9, rotate: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Click Me
    </motion.button>
  );
}
