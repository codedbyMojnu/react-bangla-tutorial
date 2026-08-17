"use client";

import { useState } from "react";
import styles from "./donate.module.css";

const whatsappNumber = "8801XXXXXXXXX"; // TODO: replace with your real WhatsApp number

const paymentMethods = [
  { name: "bKash", number: "01788262433", color: "#E2136E" },
  { name: "Nagad", number: "01788262433", color: "#F6921E" },
  { name: "Rocket", number: "017882624334", color: "#8C3494" },
];

export default function Donate() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* <h2 className={styles.title}>🚀 React Bangla কমিউনিটি</h2>
        <p className={styles.text}>
          যদি আপনি <strong>React</strong>, <strong>Next.js</strong>,{" "}
          <strong>Redux</strong>, <strong>TypeScript</strong> এর মতো মর্ডান
          ফ্রন্টএন্ড টেকনোলজিতে আগ্রহী হন, তাহলে আমাদের{" "}
          <span className={styles.highlight}>Discord সার্ভার</span> এ জয়েন
          করুন।
        </p>
        <a
          href="https://discord.gg/k3Ut7nvXWE"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          🎉 এখনই জয়েন করুন
        </a>

        <div className={styles.divider} /> */}

        <h3 className={styles.subtitle}>❤️ পাশে থাকুন, সাপোর্ট করুন</h3>
        <p className={styles.text}>
          এই কমিউনিটি ফ্রি রাখতে আপনার সাপোর্ট গুরুত্বপূর্ণ। ইচ্ছেমতো যেকোনো
          অ্যামাউন্ট পাঠাতে পারেন নিচের যেকোনো নাম্বারে।
        </p>

        <div className={styles.paymentList}>
          {paymentMethods.map((method, index) => (
            <div key={method.name} className={styles.paymentRow}>
              <div className={styles.paymentInfo}>
                <span
                  className={styles.paymentBadge}
                  style={{ background: method.color }}
                >
                  {method.name}
                </span>
                <span className={styles.paymentNumber}>{method.number}</span>
              </div>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => handleCopy(method.number, index)}
              >
                {copiedIndex === index ? "✅ কপি হয়েছে" : "📋 কপি"}
              </button>
            </div>
          ))}
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          💬 হোয়াটসঅ্যাপে যোগাযোগ করুন
        </a>
      </div>
    </div>
  );
}
