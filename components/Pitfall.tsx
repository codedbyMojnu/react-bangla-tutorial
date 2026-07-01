import type { ReactNode } from "react";
import styles from "./pitfall.module.css";

export default function Pitfall({ children }: { children: ReactNode }) {
  return (
    <div className={styles.pitfallBox}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
