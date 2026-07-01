import styles from "./pdfDownloader.module.css";

interface PdfDownloaderProps {
  src: string; // PDF file link
  title: string; // Tutorial title
}

export default function PdfDownloader({ src, title }: PdfDownloaderProps) {
  return (
    <div className={styles.pdfContainer}>
      <div className={styles.pdfCard}>
        <div className={styles.pdfHeader}>📘 {title}</div>

        <a href={src} download className={styles.pdfButton}>
          ⬇️ Download PDF
        </a>

        <div className={styles.pdfFooter}>👉 টিউটোরিয়ালটি PDF আকারে ডাউনলোড করে পড়ুন 🚀</div>
      </div>
    </div>
  );
}
