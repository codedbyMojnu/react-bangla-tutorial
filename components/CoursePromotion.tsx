import styles from "./course-promotion.module.css";

export default function CoursePromotion() {
  return (
    <div className={styles.courseContainer}>
      <div className={styles.courseCard}>
        <h2 className={styles.courseTitle}>💡 শেখার সুযোগ!</h2>

        <p className={styles.courseText}>
          আমার কাছে{" "}
          <strong className={styles.courseHighlight}>HTML, CSS, Tailwind CSS, JavaScript, React, Git and Github</strong>{" "}
          শিখতে যোগাযোগ কর।
        </p>
        <p className={styles.courseText}>
          মাসিক <span className={`${styles.courseHighlight} ${styles.greenText}`}>১৫০০০ টাকা</span> নিব, সপ্তাহে{" "}
          <span className={`${styles.courseHighlight} ${styles.blueText}`}>৩ দিন</span> শিক্ষার্থীর বাসায় গিয়ে
          অফলাইনে করাব।
        </p>
        <p className={styles.courseText}>
          কোর্স ডিউরেশন <span className={`${styles.courseHighlight} ${styles.redText}`}>৩ মাস</span>। এটি একদম{" "}
          <span className={`${styles.courseHighlight} ${styles.purpleText}`}>বিগিনারদের</span> জন্য।
        </p>
        <a
          href="https://wa.me/01788262433"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.courseButton}
        >
          📞 WhatsApp এ যোগাযোগ করো
        </a>
      </div>
    </div>
  );
}
