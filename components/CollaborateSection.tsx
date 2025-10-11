import Link from "next/link";
import styles from "./collaborate-section.module.css";

const CollaborateSection: React.FC = () => {
  return (
    <section className={styles.collaborateSection}>
      <div className={styles.card}>
        <h2 className={styles.title}>চলুন একসাথে কাজ করি!</h2>
        <p className={styles.description}>
          আপনি যদি কোনো React বা Frontend প্রজেক্টে কাজ করাতে চান, কিংবা শেখার
          ব্যাপারে সহযোগিতা চান, আমার সঙ্গে যোগাযোগ করুন।
        </p>
        <div className={styles.buttons}>
          <Link href="/contact" className={styles.contactButton}>
            যোগাযোগ করুন
          </Link>
          <a
            href="/pdf/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeButton}
          >
            📄 রিজিউম ডাউনলোড
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollaborateSection;
