import React, { useState } from "react";
import styles from "./donate.module.css";

const bankAccount = "0100255607094";
const mobileNumber = "01788262433";
const btcAddress = "0xb2066847163c0a1d21cbb8a38eec7632f1f071e5";
const litecoinAddress = "LRYT3fVyAEUWcPhHpuJtL3bszAjqKetbKx";
const bitcoinAddress = "1CqRZFJkMCZWpUwr9aipNdpD4XymTxZ1MC";

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
        <div className={styles.headerIcon}>☕</div>
        <h2 className={styles.donateTitle}>আপনার ছোট ডোনেশন, বড় অনুপ্রেরণা!</h2>
        <p className={styles.donateText}>
          React ডকুমেন্টেশন বাংলায় অনুবাদ ও নতুন ফিচার শেয়ার করতে সময়, শ্রম ও খরচ হয়।
          <br />
          <span className={styles.highlight}>আপনার ডোনেশন এই উদ্যোগকে এগিয়ে নিতে সাহায্য করবে।</span>
        </p>
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
            <div className={styles.paymentLabel}>📲 Bkash / Nagad / Rocket</div>
            <div className={styles.paymentInfo}>
              <span className={styles.greenText}>{mobileNumber}</span>
              <CopyButton value={mobileNumber} />
            </div>
          </div>
          <div className={styles.paymentLabel}>💰 ক্রিপ্টো ওয়ালেট</div>
          <div className={styles.paymentInfo}>
            <span>BTC (BNB): <code>{btcAddress}</code> <CopyButton value={btcAddress} /></span>
          </div>
          <div className={styles.paymentInfo}>
            <span>Litecoin: <code>{litecoinAddress}</code> <CopyButton value={litecoinAddress} /></span>
          </div>
          <div className={styles.paymentInfo}>
            <span>Bitcoin: <code>{bitcoinAddress}</code> <CopyButton value={bitcoinAddress} /></span>
          </div>
        </div>
        <a
          href="https://wa.me/01788262433"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactButton}
        >
          💬 WhatsApp এ যোগাযোগ
        </a>
        <a
          href="https://wa.me/01788262433"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.donateButton}
        >
          ডোনেট করুন
        </a>
      </div>
    </div>
  );
};

export default Donate;
