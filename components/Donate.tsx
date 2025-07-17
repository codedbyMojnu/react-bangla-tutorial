import React, { useState } from "react";
import styles from "./donate.module.css";

const bankAccount = "0100255607094";
const mobileNumber = "01788262433";
const litecoinAddress = "LRYT3fVyAEUWcPhHpuJtL3bszAjqKetbKx";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={styles.copyButton}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? "✓" : "📋"}
    </button>
  );
}

const Donate: React.FC = () => {
  return (
    <div className={styles.donateContainer}>
      <div className={styles.donateCard}>
        <div className={styles.avatarSection}>
          {/* Replace with a real image if available */}
          <div className={styles.avatarPlaceholder}>🌟</div>
        </div>

        <h2 className={styles.donateTitle}>☕ Support Our Mission</h2>
        <p className={styles.donateText}>
          <span className={styles.heart}>❤️</span>
          <strong>Every little bit helps!</strong> Your donation fuels the
          translation of React documentation into Bangla and the sharing of new
          features with the community. <br />
          <span className={styles.highlight}>
            Together, we can make learning accessible for everyone.
          </span>
        </p>
        <div className={styles.textCenter}>
          <button className={styles.donateButton} disabled>
            ডোনেট করুন
          </button>
        </div>
        <div className={styles.paymentSection}>
          <div className={styles.paymentGroup}>
            <div className={styles.paymentLabel}>🏦 ব্যাংক (Janata Bank)</div>
            <div className={styles.paymentInfo}>
              <span>Md. Mojnu Miah</span>
              <span className={styles.greenText}>{bankAccount}</span>
              <CopyButton value={bankAccount} />
            </div>
          </div>
          <div className={styles.paymentGroup}>
            <div className={styles.paymentLabel}>
              📲 Bkash / Nagad / Rocket (Personal)
            </div>
            <div className={styles.paymentInfo}>
              <span className={styles.greenText}>{mobileNumber}</span>
              <CopyButton value={mobileNumber} />
            </div>
            <div className={styles.paymentLabel}>💰 Litecoin Address</div>
            <div className={styles.paymentInfo}>
              <span className={styles.greenText}>{litecoinAddress}</span>
              <CopyButton value={litecoinAddress} />
            </div>
          </div>
        </div>
        <div className={styles.thankYouNote}>
          <span role="img" aria-label="thank you">
            🙏
          </span>{" "}
          Thank you for believing in this mission. Your support means the world!
        </div>
        <div className={styles.signature}>— Mojnu Miah</div>
      </div>
    </div>
  );
};

export default Donate;
