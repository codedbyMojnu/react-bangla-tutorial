import ProgressBar from "@/components/ProgressBar";
import { appName, siteDescription, siteUrl } from "@/lib/shared";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Anek_Bangla, Baloo_Da_2 } from "next/font/google";
import "./global.css";

// Anek Bangla by Ek Type — dual-axis variable font (weight + width).
// Best eye comfort for long-form Bangla reading; humanist proportions reduce fatigue.
const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-anek-bangla",
});

// Baloo Da 2 — rounded display font for headings.
// Pairs with Anek Bangla: strong visual hierarchy for tutorial H1/H2/H3.
const balooDa2 = Baloo_Da_2({
  subsets: ["bengali"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-baloo-da-2",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName} — বাংলায় প্রোগ্রামিং শিখুন`,
    template: `%s – ${appName}`,
  },
  description: siteDescription,
  keywords: [
    "React Bangla",
    "React JS বাংলা টিউটোরিয়াল",
    "Next.js বাংলা",
    "JavaScript বাংলা",
    "Git GitHub বাংলা",
    "Redux বাংলা",
    "Framer Motion বাংলা",
    "Laravel বাংলা",
    "PHP OOP বাংলা",
    "বাংলাদেশী ডেভেলপার",
  ],
  authors: [{ name: "Md. Mojnu Miah", url: "https://github.com/codedbyMojnu" }],
  creator: "Md. Mojnu Miah",
  applicationName: appName,
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/react-bangla-icon.png",
    apple: "/icons/react-bangla-icon.png",
    shortcut: "/icons/react-bangla-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: siteUrl,
    siteName: appName,
    title: `${appName} — বাংলায় প্রোগ্রামিং শিখুন`,
    description: siteDescription,
    images: [
      {
        url: "/icons/react-bangla-icon.png",
        width: 512,
        height: 512,
        alt: appName,
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@codedbymojnu",
    creator: "@codedbymojnu",
    title: `${appName} — বাংলায় প্রোগ্রামিং শিখুন`,
    description: siteDescription,
  },
  verification: {
    google: "-0oyDJ10CwLMNFF2z2zhS90QOrbzypnffqi7A4LkYbU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: appName,
  url: siteUrl,
  description: siteDescription,
  inLanguage: "bn",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/docs?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: appName,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/icons/react-bangla-icon.png`,
    },
  },
  author: {
    "@type": "Person",
    name: "Md. Mojnu Miah",
    url: "https://github.com/codedbyMojnu",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${anekBangla.variable} ${balooDa2.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="flex flex-col min-h-screen"
        style={{
          fontFamily:
            "var(--font-anek-bangla), 'Noto Sans Bengali', 'Hind Siliguri', Roboto, Arial, Helvetica, sans-serif",
        }}
      >
        <ProgressBar />
        <RootProvider>{children}</RootProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
