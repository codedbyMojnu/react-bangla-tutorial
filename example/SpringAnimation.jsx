import { motion } from "framer-motion";

export default function SpringAnimation() {
  return (
    <motion.div
      style={{
        width: 160,
        height: 160,
        background: "#f59e0b",
        borderRadius: 12,
      }}
      animate={{
        y: [0, -100, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
    />
  );
}
