import React, { useRef, useState } from "react";
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
  const paymentRef = useRef<HTMLDivElement>(null);

  const scrollToPayment = () => {
    paymentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.donateContainer}>
      <div className={styles.donateCard}>
        <div className={styles.avatarSection}>
          <span className={styles.heartIcon} role="img" aria-label="heart">❤️</span>
        </div>
        <div className={styles.donateTitle}>আপনার ছোট্ট সহানুভূতি, কারো জীবনে বড় পরিবর্তন আনতে পারে</div>
        <div className={styles.donateText}>
          আপনার একটি ছোট অনুদানও আমাদের স্বপ্নকে এগিয়ে নিতে পারে। <span className={styles.highlight}>আপনার সহানুভূতি, ভালোবাসা ও সমর্থন</span> আমাদের প্রতিটি পদক্ষেপে অনুপ্রেরণা যোগায়।
        </div>
        <button className={styles.donateButton} onClick={scrollToPayment}>
          অনুদান দিন
        </button>
        <div className={styles.whyDonateSection}>
          <div className={styles.whyDonateTitle}>কেন অনুদান দেবেন?</div>
          <div className={styles.whyDonateText}>
            আমরা বিশ্বাস করি, <b>জ্ঞান ভাগাভাগি</b> করলে তা আরও বাড়ে। আপনার অনুদান আমাদেরকে আরও বেশি মানসম্মত কনটেন্ট তৈরি করতে, নতুন শিক্ষার্থীদের পাশে দাঁড়াতে এবং প্রযুক্তি শিক্ষাকে সবার জন্য সহজলভ্য করতে সাহায্য করবে।
            <br />
            <span className={styles.impactLine}>আপনার অনুদান—ছোট হোক বা বড়—কারো জীবনে আলো ছড়াতে পারে।</span>
          </div>
        </div>
        <div ref={paymentRef} className={styles.paymentSection}>
          <div className={styles.paymentGroup}>
            <div className={styles.paymentLabel}>🏦 ব্যাংক (Janata Bank)</div>
            <div className={styles.paymentInfoCard}>
              <span>Md. Mojnu Miah</span>
              <span className={styles.greenText}>{bankAccount}</span>
              <CopyButton value={bankAccount} />
            </div>
          </div>
          <div className={styles.paymentGroup}>
            <div className={styles.paymentLabel}>📲 Bkash / Nagad / Rocket (Personal)</div>
            <div className={styles.paymentInfoCard}>
              <span className={styles.greenText}>{mobileNumber}</span>
              <CopyButton value={mobileNumber} />
            </div>
          </div>
          <div className={styles.paymentGroup}>
            <div className={styles.paymentLabel}>💰 Litecoin Address</div>
            <div className={styles.paymentInfoCard}>
              <span className={styles.greenText}>{litecoinAddress}</span>
              <CopyButton value={litecoinAddress} />
            </div>
          </div>
        </div>
        <div className={styles.thankYouNote}>
          <span role="img" aria-label="thank you">🙏</span> আপনার উদারতা আমাদের হৃদয় ছুঁয়ে যায়। <b>আপনার সমর্থন আমাদের কাছে অমূল্য।</b> একসাথে আমরা আরও অনেক দূর যেতে পারবো!
        </div>
        <div className={styles.signature}>— Mojnu</div>
      </div>
    </div>
  );
};

export default Donate;
