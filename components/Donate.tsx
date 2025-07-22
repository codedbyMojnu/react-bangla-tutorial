// Donate.tsx
import React, { useRef, useState } from "react";
import styles from "./donate.module.css";

// --- আপনার পেমেন্ট তথ্য ---
const bankAccount = "0100255607094";
const mobileNumber = "01788262433";
const litecoinAddress = "LRYT3fVyAEUWcPhHpuJtL3bszAjqKetbKx"; // Litecoin ঠিকানা

// --- কপি বাটন কম্পোনেন্ট ---
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={styles.copyButton}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      aria-label="কপি করুন"
      title="কপি করুন"
    >
      {copied ? "✅ কপি হয়েছে!" : "📋 কপি করুন"}
    </button>
  );
}

// --- মূল Donate কম্পোনেন্ট ---
const Donate: React.FC = () => {
  const paymentRef = useRef<HTMLDivElement>(null);

  const scrollToPayment = () => {
    paymentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className={styles.donateContainer}>
      <div className={styles.donateCard}>
        <div className={styles.avatarSection}>
          <span
            className={styles.coffeeIcon}
            role="img"
            aria-label="coffee"
          ></span>
        </div>
        <div className={styles.donateButton}> ☕ আমাকে সাপোর্ট করুন</div>

        <div className={styles.whyDonateSection}>
          <div className={styles.whyDonateText}>
            আমি বিশ্বাস করি, প্রযুক্তি শেখা এবং শেখানো সবার জন্য উন্মুক্ত হওয়া
            উচিত। আপনার ছোট অনুদানও আমার ইন্টারনেট খরচ, সার্ভার খরচ, আরও উন্নত
            কনটেন্ট তৈরি এবং নতুন শিক্ষার্থীদের পাশে দাঁড়াতে সাহায্য করবে।
          </div>
        </div>

        <div ref={paymentRef} className={styles.paymentSection}>
          <div className={styles.paymentHeader}>সহজ পেমেন্ট পদ্ধতি</div>

          <div className={styles.paymentGroup}>
            <div className={styles.paymentLabel}>
              📲 মোবাইল ব্যাংকিং (bKash / Nagad / Rocket)
            </div>
            <div className={styles.paymentInfoCard}>
              <span>{mobileNumber}</span>
              <CopyButton value={mobileNumber} />
            </div>
            <div className={styles.paymentNote}>
              এটি একটি পার্সোনাল নম্বর — *Send Money* অপশন ব্যবহার করুন।
            </div>
          </div>

          <div className={styles.paymentGroup}>
            <div className={styles.paymentLabel}>
              🏦 ব্যাংক একাউন্ট (Janata Bank)
            </div>
            <div className={styles.paymentInfoCard}>
              <span>Md. Mojnu Miah</span>
              <span>{bankAccount}</span>
              <CopyButton value={bankAccount} />
            </div>
          </div>
        </div>

        <div className={styles.signature}>— আপনার শুভাকাঙ্ক্ষী, মজনু</div>
      </div>
    </div>
  );
};

export default Donate;
