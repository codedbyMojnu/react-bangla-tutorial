'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fixed reading-progress indicator showing how far the user has scrolled
 * down the current page.
 */
export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.body.scrollHeight - window.innerHeight;
          const percent = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
          setProgress(percent);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'rgba(37,99,235,0.08)',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #10b981 0%, #2563eb 100%)',
          transition: 'width 0.2s cubic-bezier(.4,0,.2,1)',
        }}
      />
    </div>
  );
}
