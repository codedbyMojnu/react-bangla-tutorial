// pages/\_app.tsx

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import ProgressBar from "../components/ProgressBar";
import { LearningProvider } from "../components/learning/LearningContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LearningProvider>
      <ProgressBar />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </LearningProvider>
  );
}

export default MyApp;
