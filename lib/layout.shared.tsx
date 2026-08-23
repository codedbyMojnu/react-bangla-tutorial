import Logo from "@/components/Logo";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
    },

    links: [
      { text: "me", url: "/my-resume", on: "nav" },
      { text: "About", url: "/about", on: "nav" },
      { text: "💚 Sponsor", url: "/sponsor" },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
