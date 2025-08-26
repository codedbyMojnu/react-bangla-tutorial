import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Counter() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 100, { duration: 2 });
    return animation.stop;
  }, []);

  return (
    <div style={{ fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
      <motion.span>{rounded}</motion.span>
    </div>
  );
}
