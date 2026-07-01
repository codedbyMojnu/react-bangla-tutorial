import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function StaggerList() {
  const items = ["প্রথম", "দ্বিতীয়", "তৃতীয়"];

  return (
    <motion.ul
      style={{ listStyle: "none", padding: 0 }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          style={{
            padding: 16,
            background: "#6366f1",
            margin: "8px 0",
            borderRadius: 8,
            color: "#fff",
          }}
          variants={itemVariants}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
