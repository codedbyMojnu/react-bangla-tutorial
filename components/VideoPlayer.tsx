import styles from "./videoPlayer.module.css";

interface VideoPlayerProps {
  src: string; // should be a YouTube link
  title: string;
  optionalMessage?: string;
}

function getEmbedUrl(src: string): string {
  let videoId = "";

  if (src.includes("youtu.be/")) {
    videoId = src.split("youtu.be/")[1].split(/[?&]/)[0];
  } else if (src.includes("watch?v=")) {
    videoId = src.split("watch?v=")[1].split("&")[0];
  } else if (src.includes("/embed/")) {
    return src; // already an embed URL
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : src;
}

export default function VideoPlayer({
  src,
  title,
  optionalMessage,
}: VideoPlayerProps) {
  // Convert a normal YouTube link into an embeddable one
  const embedUrl = getEmbedUrl(src);

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoCard}>
        <div className={styles.videoHeader}>🎬 {title}</div>

        <div className={styles.videoWrapper}>
          <iframe
            className={styles.videoPlayer}
            src={embedUrl}
            title={title}
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
}
