import { motion } from "framer-motion";

export default function DragExample() {
  return (
    <motion.div
      style={{
        width: 128,
        height: 128,
        background: "#22c55e",
        borderRadius: 12,
      }}
      drag
      dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
    />
  );
}
