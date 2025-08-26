import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollAnimation() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 2]);

  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: "200px" }} />
      <motion.div
        style={{
          scale,
          width: 160,
          height: 160,
          background: "#ec4899",
          borderRadius: 12,
          margin: "0 auto",
        }}
      />
      <div style={{ height: "200px" }} />
    </div>
  );
}
