import dynamic from "next/dynamic";
import { DocsThemeConfig } from "nextra-theme-docs";
import AudioPlayer from "./components/AudioPlayer";
import CollaborateSection from "./components/CollaborateSection";
import Logo from "./components/Logo";
import PdfDownloader from "./components/PdfDownloader";
import Showcase from "./components/Showcase";
import VideoPlayer from "./components/VideoPlayer";

const GiscusComments = dynamic(() => import("./components/GiscusComments"), {
  ssr: false,
}) as React.FC<any>;
const LiveCodeEditor = dynamic(() => import("./components/LiveCodeEditor"), {
  ssr: false,
}) as React.FC<any>;
const Donate = dynamic(() => import("./components/Donate"), {
  ssr: false,
}) as React.FC<any>;
const Pitfall = dynamic(() => import("./components/Pitfall"), {
  ssr: false,
}) as React.FC<any>;
const Reveal = dynamic(() => import("./components/Reveal"), {
  ssr: false,
}) as React.FC<any>;
const Custom404Page = dynamic(() => import("./components/Custom404Page"), {
  ssr: false,
}) as React.FC<any>;

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: "https://github.com/codebymojnu/react-bangla-tutorial",
  },
  chat: {
    link: "https://discord.gg/8ZpFFu5d",
  },
  docsRepositoryBase:
    "https://github.com/codedbyMojnu/react-bangla-tutorial/blob/main",
  footer: {
    text: `© 2024 - ${new Date().getFullYear()} React JS Bangla Tutorial.`,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1, // here
  },
  components: {
    Donate,
    GiscusComments,
    Reveal,
    Pitfall,
    LiveCodeEditor,
    AudioPlayer,
    PdfDownloader,
    VideoPlayer,
    Custom404Page,
    Showcase,
    CollaborateSection,
  },
  useNextSeoProps() {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return {
        titleTemplate: "%s – React JS Bangla Tutorial",
      };
    }
    return { titleTemplate: "React JS Bangla Tutorial" };
  },
  head: (props: { title?: string; meta?: { description?: string } }) => {
    const { title, meta } = props;
    const description =
      meta?.description ||
      "React JS Bangla Tutorial - স্টেপ বাই স্টেপ ফলো করে বাংলা ভাষায় রিয়েক্ট জেএস শিখুন।";
    const url =
      typeof window !== "undefined"
        ? `https://react-bangla.vercel.app${window.location.pathname}`
        : "https://react-bangla.vercel.app";

    return (
      <>
        {/* SEO and Meta Tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width" />
        <meta httpEquiv="Content-Language" content="bn" />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/icons/react-bangla-icon.png" />
        <link rel="apple-touch-icon" href="/icons/react-bangla-icon.png" />
        <link rel="shortcut icon" href="/icons/react-bangla-icon.png" />
        <meta
          name="keywords"
          content="React, Bangla, Tutorial, React JS, Frontend Development, Web Development, JavaScript, Programming, Bangladesh, Learn React, React in Bengali, React tutorial in Bangla, React project, React assignments, React hooks, React router, React query, Axios, React Hook Form, Next.js, Nextra, UI/UX, Developer career, Job posts, System design, Interview preparation"
        />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="React JS Bangla Tutorial" />
        <meta name="og:title" content={title || "React JS Bangla Tutorial"} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://react-bangla.vercel.app/icons/react-bangla-icon.png"
        />
        <meta property="og:image:alt" content="React JS Bangla Tutorial Logo" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:image"
          content="https://react-bangla.vercel.app/icons/react-bangla-icon.png"
        />
        <meta
          name="google-site-verification"
          content="-0oyDJ10CwLMNFF2z2zhS90QOrbzypnffqi7A4LkYbU"
        />
      </>
    );
  },
};

export default config;
