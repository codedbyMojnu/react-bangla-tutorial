import styles from "./audioPlayer.module.css";

interface AudioPlayerProps {
  src: string;
  title: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <div className={styles.audioContainer}>
      <div className={styles.audioCard}>
        <div className={styles.audioHeader}>🎧 {title}</div>

        <audio controls className={styles.audioPlayer}>
          <source src={src} type="audio/mpeg" />
          আপনার ব্রাউজার অডিও সাপোর্ট করে না।
        </audio>

        <div className={styles.audioFooter}>👉 সময় কম? অডিও ফাইলটি শুনুন 🚀</div>
      </div>
    </div>
  );
}
