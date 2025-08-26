import React from "react";
import { motion } from "framer-motion";

const Box = ({ text }) => (
  <motion.div
    style={{
      width: 128,
      height: 128,
      margin: 16,
      borderRadius: 8,
      background: "#f9a8d4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    <span style={{ color: "#111", fontSize: 20 }}>{text}</span>
  </motion.div>
);

export default function ScrollReveal() {
  const items = ["হ্যালো", "আসসালামু আলাইকুম", "স্বাগতম", "শুভেচ্ছা", "আসুন"];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 40,
      }}
    >
      {items.map((item, i) => (
        <Box key={i} text={item} />
      ))}
    </div>
  );
}
