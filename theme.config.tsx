import { DocsThemeConfig } from "nextra-theme-docs";
import Donate from "./components/Donate";
import Logo from "./components/Logo";

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
    text: "React Bangla Tutorial",
  },

  components: {
    Donate,
  },
  useNextSeoProps() {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return {
        titleTemplate: "%s – React Bangla Tutorial",
      };
    }
    return { titleTemplate: "React Bangla Tutorial" };
  },
  head: (props: { title?: string; meta?: { description?: string } }) => {
    const { title, meta } = props;
    const description =
      meta?.description ||
      "React Bangla Tutorial - স্টেপ বাই স্টেপ ফলো করে রিয়েক্ট শিখুন.";
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
        <meta name="keywords" content="React, Bangla, Tutorial" />
        <link rel="canonical" href={url} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="React Bangla Tutorial" />
        <meta name="og:title" content={title || "React Bangla Tutorial"} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </>
    );
  },
};

export default config;
