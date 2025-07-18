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
      aria-label="কপি করুন"
    >
      {copied ? "✓" : "📋"}
    </button>
  );
}

const Donate: React.FC = () => {
  return (
    <div className={styles.donateContainer}>
      <div className={styles.donateCard}>
        <div className={styles.textCenter}>
          <button className={styles.donateButton} disabled>
            অনুদান দিন
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
          আমাদের এই মিশনে বিশ্বাস রাখার জন্য আপনাকে ধন্যবাদ। আপনার সমর্থন আমাদের
          কাছে অমূল্য! আপনার সামান্য অনুদানও আমাদের জন্য অনেক বড়!
        </div>
        <div className={styles.signature}>— Mojnu</div>
      </div>
    </div>
  );
};

export default Donate;
