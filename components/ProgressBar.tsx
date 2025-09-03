import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);
  const router = useRouter();

  // Hide progress bar on 404 pages
  const is404Page = router.pathname === '/404' || router.asPath === '/404';

  // Update progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.body.scrollHeight - window.innerHeight;
          const percent =
            docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
          setProgress(percent);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render the progress bar on 404 pages
  if (is404Page) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 64, // Adjust this value to match your header's height
        left: 0,
        width: "100%",
        height: "2px",
        background: "rgba(37,99,235,0.08)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: `${progress * 100}%`,
          height: "100%",
          background: "linear-gradient(90deg, #10b981 0%, #2563eb 100%)",
          transition: "width 0.2s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
};

export default ProgressBar;
