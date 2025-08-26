import { motion } from "framer-motion";

export default function BasicAnimation() {
  return (
    <motion.div
      style={{
        width: 160,
        height: 160,
        background: "#ef4444",
        borderRadius: 12,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    />
  );
}
