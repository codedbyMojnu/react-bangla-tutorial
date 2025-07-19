import { ReactNode } from "react";
import styles from "./pitfall.module.css";

export default function Pitfall({ children }: { children: ReactNode }) {
  return (
    <div className={styles.pitfallBox}>
      {/* <span className={styles.icon} aria-label="Warning">⚠️</span> */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
