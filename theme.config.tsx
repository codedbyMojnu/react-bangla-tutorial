import dynamic from "next/dynamic";
import { DocsThemeConfig } from "nextra-theme-docs";
import AudioPlayer from "./components/AudioPlayer";
import Logo from "./components/Logo";
import PdfDownloader from "./components/PdfDownloader";
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
const Custom404Page = dynamic(() => import("./pages/404.mdx").then(mod => ({ default: mod.Custom404Page })), {
  ssr: false,
}) as React.FC<any>;

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: "https://github.com/codebymojnu/react-bangla-tutorial",
  },
  chat: {
    link: "https://www.linkedin.com/in/mojnu0/",
  },
  docsRepositoryBase:
    "https://github.com/codedbyMojnu/react-bangla-tutorial/blob/main",
  footer: {
    text: `© ${new Date().getFullYear()} React JS Bangla Tutorial.`,
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
        <meta name="google-adsense-account" content="ca-pub-6697055628906617" />
      </>
    );
  },
};

export default config;
