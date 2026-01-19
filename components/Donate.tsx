import styles from "./donate.module.css";

const Donate: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>🚀 React Bangla কমিউনিটি</h2>
        <p className={styles.text}>
          যদি আপনি <strong>React</strong>, <strong>Next.js</strong>,{" "}
          <strong>Redux</strong>, <strong>TypeScript</strong> এর মতো মর্ডান
          ফ্রন্টএন্ড টেকনোলজিতে আগ্রহী হন, তাহলে আমাদের{" "}
          <span className={styles.highlight}>Discord সার্ভার</span> এ জয়েন করুন।
        </p>

        <a
          href="https://discord.gg/k3Ut7nvXWE"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          🎉 এখনই জয়েন করুন
        </a>
      </div>
    </div>
  );
};

export default Donate;
