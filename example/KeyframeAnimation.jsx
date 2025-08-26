import { motion } from "framer-motion";

export default function KeyframeAnimation() {
  return (
    <motion.div
      style={{
        width: 160,
        height: 160,
        background: "#3b82f6",
        borderRadius: 12,
      }}
      animate={{
        scale: [1, 1.5, 1, 1.5, 1],
        rotate: [0, 90, 0, -90, 0],
        borderRadius: ["20%", "50%", "20%", "50%", "20%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
}
