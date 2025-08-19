import React from "react";
import styles from "./audioPlayer.module.css";

interface AudioPlayerProps {
  src: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  return (
    <div className={styles.audioContainer}>
      <div className={styles.audioCard}>
        <div className={styles.audioHeader}>🎧 {title}</div>

        <audio controls className={styles.audioPlayer}>
          <source src={src} type="audio/mpeg" />
          আপনার ব্রাউজার অডিও সাপোর্ট করে না।
        </audio>

        <div className={styles.audioFooter}>👉 সময় কম অডিও ফাইলটি শুনুন 🚀</div>
      </div>
    </div>
  );
};

export default AudioPlayer;
