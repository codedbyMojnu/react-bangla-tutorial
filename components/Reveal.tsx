import { useState } from 'react';
import styles from './Reveal.module.css';

export default function Reveal({ children, label = 'Click to see the solution' }: { children: React.ReactNode, label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.revealContainer}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={styles.revealButton}
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="reveal-content"
      >
        {open ? 'Hide Solution' : label}
      </button>
      {open && (
        <div
          id="reveal-content"
          className={styles.revealContent}
        >
          {children}
        </div>
      )}
    </div>
  );
} 