import { motion } from "framer-motion";

export default function PathAnimation() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <motion.path
        d="M 50 100 Q 100 50 150 100 T 250 100"
        stroke="#8b5cf6"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.circle
        cx="50"
        cy="100"
        r="8"
        fill="#8b5cf6"
        initial={{ pathOffset: 0 }}
        animate={{ pathOffset: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}
