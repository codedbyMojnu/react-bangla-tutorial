import React, { useState } from "react";
import styles from "./donate.module.css";

// --- স্পনসরশিপ টায়ার ডাটা ---
const tiers = [
  {
    price: "৳200 / মাস",
    title: "আপনি আমার কাজকে মূল্যায়ন করেন 😊",
    benefits: [
      "মাসিক নিউজলেটার আপডেট পান",
      "স্পনসর ব্যাজ এই সাইটে প্রদর্শিত হবে",
      "নতুন ফিচার আনার জন্য প্রস্তাব দেওয়ার সুযোগ",
      "এই সাইটে বিজ্ঞাপন দিতে পারবেন",
    ],
  },
  {
    price: "৳250 / একবার",
    title: "আপনি আমার উন্নত কাজকে সমর্থন করেন 🤝",
    benefits: ["স্পনসর ব্যাজ এই সাইটে প্রদর্শিত হবে"],
  },
];

const Donate: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={styles.donateContainer}>
      <h2 className={styles.donateTitle}>💙 স্পনসর করুন</h2>

      <div className={styles.paymentSection}>
        <div className={styles.paymentCard}>
          <p>
            <strong>01788262433</strong> <br />
            (পার্সোনাল বিকাশ / নগদ / রকেট নম্বর)
          </p>
          <small>*Send Money অপশন ব্যবহার করুন</small>
        </div>
      </div>

      <div className={styles.tierGrid}>
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`${styles.tierCard} ${
              selected === index ? styles.active : ""
            }`}
            onClick={() => setSelected(index)}
          >
            <div className={styles.tierPrice}>{tier.price}</div>
            <div className={styles.tierTitle}>{tier.title}</div>
            <ul className={styles.tierBenefits}>
              {tier.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donate;
