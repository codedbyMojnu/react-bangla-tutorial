"use client";

import styles from "./ebook.module.css";

interface EbookProps {
  /** Book title / name. */
  title: string;
  subTitle?: string;
  /** List of chapter names/titles */
  chapters?: string[];
  /** Path or URL to the cover image. */
  cover: string;
  /** "preorder" shows a release date + amber ribbon; "order" shows a
   * green "স্টকে আছে" ribbon, i.e. available right now. */
  status: "preorder" | "order";
  /** Only shown when status is "preorder". */
  releaseDate?: string;
  /** WhatsApp number (e.g. "8801788262433") or a full wa.me / https link. */
  whatsapp: string;
  /** Regular price, e.g. "৳৪৯৯". */
  mainPrice: string;
  /** Discounted pre-order price, e.g. "৳৩৪৯". When set, mainPrice is
   * shown struck through next to it, and a % off badge is computed
   * automatically if both prices contain a parseable number. */
  prereleasePrice?: string;
}

// Pull the first run of digits out of a price string ("৳১,৪৯৯", "1499",
// "৳499") so we can compute a discount percentage. Handles both ASCII
// digits and Bangla-Indic numerals (০-৯), since prices on this site are
// usually typed in Bangla. Returns null if no usable number is found,
// so we never show a made-up discount.
function parsePrice(price: string): number | null {
  const bengaliToAscii = price.replace(/[০-৯]/g, (d) =>
    String("০১২৩৪৫৬৭৮৯".indexOf(d)),
  );
  const digits = bengaliToAscii.replace(/[^\d.]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

function toWhatsAppLink(whatsapp: string, title: string) {
  const message = encodeURIComponent(`আমি "${title}" বইটি অর্ডার করতে চাই।`);
  if (whatsapp.startsWith("http")) return whatsapp;
  const digits = whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${message}`;
}

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.98.582 3.823 1.585 5.372L2 22l4.75-1.55A9.96 9.96 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.2a8.17 8.17 0 0 1-4.18-1.148l-.3-.178-3.09.998.998-3.037-.196-.31A8.16 8.16 0 0 1 3.8 12c0-4.522 3.678-8.2 8.2-8.2S20.2 7.478 20.2 12s-3.677 8.2-8.199 8.2z" />
  </svg>
);

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 2H6c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2h13c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1zm-1 18H6c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1h12v17z" />
    <path d="M8 6h8v2H8zm0 4h8v2H8zm0 4h5v2H8z" />
  </svg>
);

const COVER_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" viewBox="0 0 200 300">
      <rect width="200" height="300" fill="#1f2937"/>
      <rect x="30" y="40" width="140" height="220" rx="4" fill="none" stroke="#4b5563" stroke-width="3"/>
      <line x1="55" y1="90" x2="145" y2="90" stroke="#4b5563" stroke-width="3"/>
      <line x1="55" y1="115" x2="145" y2="115" stroke="#4b5563" stroke-width="3"/>
      <line x1="55" y1="140" x2="120" y2="140" stroke="#4b5563" stroke-width="3"/>
    </svg>`,
  );

export default function Ebook({
  title,
  subTitle,
  chapters,
  cover,
  status,
  releaseDate,
  whatsapp,
  mainPrice,
  prereleasePrice,
}: EbookProps) {
  const mainNum = parsePrice(mainPrice);
  const preNum = prereleasePrice ? parsePrice(prereleasePrice) : null;
  const discountPercent =
    mainNum && preNum && preNum < mainNum
      ? Math.round(((mainNum - preNum) / mainNum) * 100)
      : null;

  const waLink = toWhatsAppLink(whatsapp, title);

  return (
    <div className={styles.ebookCard}>
      <div className={styles.coverWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={title}
          className={styles.cover}
          onError={(e) => {
            (e.target as HTMLImageElement).src = COVER_FALLBACK;
          }}
        />
        <span
          className={`${styles.statusRibbon} ${
            status === "preorder" ? styles.statusPreorder : styles.statusOrder
          }`}
        >
          {status === "preorder" ? "প্রি-অর্ডার" : "স্টকে আছে"}
        </span>
        {discountPercent !== null && (
          <span className={styles.discountBadge}>{discountPercent}% ছাড়</span>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {subTitle && <h4 className={styles.subTitle}>{subTitle}</h4>}

        {chapters && chapters.length > 0 && (
          <div className={styles.chaptersCard}>
            <div className={styles.chaptersHeader}>
              <span>অধ্যায়সমূহ ({chapters.length}টি)</span>
            </div>
            <ul className={styles.chaptersList}>
              {chapters.map((chapter, idx) => (
                <li key={idx} className={styles.chapterItem}>
                  <span className={styles.chapterText}>{chapter}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {status === "preorder" && releaseDate && (
          <p className={styles.releaseInfo}>📅 রিলিজ: {releaseDate}</p>
        )}

        <div className={styles.priceRow}>
          {prereleasePrice ? (
            <>
              <span className={styles.oldPrice}>{mainPrice}</span>
              <span className={styles.newPrice}>{prereleasePrice}</span>
            </>
          ) : (
            <span className={styles.newPrice}>{mainPrice}</span>
          )}
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          <WhatsAppIcon />
          {status !== "order"
            ? "প্রিভিউ দেখতে WhatsApp এ মেসেজ দিন: 01788262433"
            : "WhatsApp এ অর্ডার করুন"}
        </a>
      </div>
    </div>
  );
}
