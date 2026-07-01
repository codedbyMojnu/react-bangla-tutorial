import styles from "./collaborate-section.module.css";

export default function CollaborateSection() {
  return (
    <section className={styles.collaborateSection}>
      <div className={styles.card}>
        <h2 className={styles.title}>চলুন একসাথে কাজ করি!</h2>
        <p className={styles.description}>
          আপনি যদি কোনো React বা Frontend প্রজেক্টে কাজ করাতে চান, কিংবা শেখার ব্যাপারে সহযোগিতা চান, আমার সঙ্গে
          যোগাযোগ করুন।
        </p>
        <div className={styles.buttons}>
          <a
            href="https://github.com/codedbyMojnu"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactButton}
          >
            যোগাযোগ করুন
          </a>
          <a href="/pdf/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeButton}>
            📄 রিজিউম ডাউনলোড
          </a>
        </div>
      </div>
    </section>
  );
}
