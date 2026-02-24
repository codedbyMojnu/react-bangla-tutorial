// pages/\_app.tsx

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import ProgressBar from "../components/ProgressBar";

const kalpurush = localFont({
  src: "../public/fonts/kalpurush.ttf",
  display: "swap",
  variable: "--font-kalpurush",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${kalpurush.style.fontFamily}, sans-serif;
        }
      `}</style>
      <main className={kalpurush.className}>
        <ProgressBar />
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </main>
    </>
  );
}

export default MyApp;
