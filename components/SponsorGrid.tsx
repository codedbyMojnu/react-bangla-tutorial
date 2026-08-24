"use client";

import type { ReactNode } from "react";
import styles from "./sponsor.module.css";

// Wraps a set of <Sponsor /> cards in a real CSS grid so the column
// count is exact at each breakpoint (not an approximation from
// flex-wrap): 1 column on mobile, 2 on medium screens, 3 on
// extra-large screens. Same pattern as <EbookGrid />.
//
// Usage in .mdx — the individual <Sponsor /> calls are unchanged, just
// nested inside this one wrapper instead of sitting as bare siblings:
//
//   <SponsorGrid>
//     <Sponsor logo="..." title="..." description="..." ... />
//     <Sponsor logo="..." title="..." description="..." ... />
//   </SponsorGrid>
export default function SponsorGrid({ children }: { children: ReactNode }) {
  return <div className={styles.sponsorGrid}>{children}</div>;
}
