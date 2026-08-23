"use client";

import styles from "./sponsor.module.css";

interface SponsorProps {
  /** Path or URL to the sponsor's logo image. */
  logo: string;
  /** Sponsor's name or company name. */
  title: string;
  /** Short description of the sponsor or their contribution. */
  description: string;
  /** Optional link to the sponsor's website — shown as a "details" link when set. */
  url?: string;
  /** Optional label, e.g. "মাসিক স্পনসর" or "বাৎসরিক স্পনসর". */
  tier?: string;
  /** Optional override for the details link text. Defaults to "বিস্তারিত". */
  detailsLabel?: string;
}

// Neutral placeholder shown if a logo fails to load, so a missing/broken
// image never breaks the layout.
const LOGO_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="12" fill="#eef2ff"/>
      <path d="M20 40l8-16 8 12 4-6 8 10" stroke="#4338ca" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  );

// Each <Sponsor /> is one card. Call it once per sponsor directly in the
// .mdx file — no wrapping list/array needed. The card lays itself out
// with inline-flex (see sponsor.module.css) so consecutive <Sponsor />
// tags sit side by side and wrap naturally, without needing a grid
// wrapper element around them.
export default function Sponsor({
  logo,
  title,
  description,
  url,
  tier,
  detailsLabel = "বিস্তারিত",
}: SponsorProps) {
  return (
    <div className={styles.sponsorCard}>
      <div className={styles.logoContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={title}
          className={styles.sponsorLogo}
          onError={(e) => {
            (e.target as HTMLImageElement).src = LOGO_FALLBACK;
          }}
        />
      </div>
      <div className={styles.sponsorContent}>
        {tier && <span className={styles.tierBadge}>{tier}</span>}
        <h3 className={styles.sponsorTitle}>{title}</h3>
        <p className={styles.sponsorDescription}>{description}</p>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.detailsLink}
          >
            {detailsLabel} →
          </a>
        )}
      </div>
    </div>
  );
}
