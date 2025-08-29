import React from "react";
import styles from "./videoPlayer.module.css";

interface VideoPlayerProps {
  src: string; // should be YouTube link
  title: string;
  optionalMessage?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  optionalMessage,
}) => {
  // Convert normal YouTube link into embeddable one
  const embedUrl = src.replace("watch?v=", "embed/");

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoCard}>
        <div className={styles.videoHeader}>🎬 {title}</div>

        <div className={styles.videoWrapper}>
          <iframe
            className={styles.videoPlayer}
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className={styles.videoFooter}>
          {optionalMessage && (
            <blockquote className={styles.inlineQuote}>
              {optionalMessage}
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
