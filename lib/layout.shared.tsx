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
      { text: "💚 Sponsor", url: "/sponsor", on: "nav" },
      {
        text: (
          <span className="inline-flex items-center gap-1.5">
            eBook
            <span className="animate-pulse rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white mt-[-20px] ml-[-5px]">
              New
            </span>
          </span>
        ),
        url: "/ebook",
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
