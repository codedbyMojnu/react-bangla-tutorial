"use client";

import type { ReactNode } from "react";
import styles from "./ebook.module.css";

// Wraps a set of <Ebook /> cards in a real CSS grid so the column count
// is exact at each breakpoint (not an approximation from flex-wrap):
// 1 column on mobile, 2 on medium screens, 3 on extra-large screens.
//
// Usage in .mdx — the individual <Ebook /> calls are unchanged, just
// nested inside this one wrapper instead of sitting as bare siblings:
//
//   <EbookGrid>
//     <Ebook title="..." cover="..." ... />
//     <Ebook title="..." cover="..." ... />
//   </EbookGrid>
export default function EbookGrid({ children }: { children: ReactNode }) {
  return <div className={styles.ebookGrid}>{children}</div>;
}
