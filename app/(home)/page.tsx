import { siteDescription, siteUrl } from "@/lib/shared";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description: siteDescription,
  alternates: { canonical: siteUrl },
};

const collections: {
  href: string;
  title: string;
  description: string;
  emoji: string;
}[] = [
  {
    href: "/docs/react",
    title: "React",
    description: "বেসিক থেকে অ্যাডভান্সড React.js",
    emoji: "⚛️",
  },
  {
    href: "/docs/nextjs",
    title: "Next.js",
    description: "App Router সহ সম্পূর্ণ গাইড",
    emoji: "▲",
  },
  {
    href: "/docs/javascript",
    title: "JavaScript",
    description: "কোর জাভাস্ক্রিপ্ট কনসেপ্ট",
    emoji: "🟨",
  },
  {
    href: "/docs/git",
    title: "Git ও GitHub",
    description: "ভার্সন কন্ট্রোল শিখুন",
    emoji: "🔧",
  },
  {
    href: "/docs/redux",
    title: "Redux",
    description: "Redux Toolkit ও RTK Query",
    emoji: "🗃️",
  },
  {
    href: "/docs/react-router",
    title: "React Router",
    description: "ক্লায়েন্ট-সাইড রাউটিং",
    emoji: "🧭",
  },
  {
    href: "/docs/react-query",
    title: "React Query",
    description: "ডাটা ফেচিং ও ক্যাশিং",
    emoji: "🔄",
  },
  {
    href: "/docs/react-hook-form",
    title: "React Hook Form",
    description: "পারফরম্যান্ট ফর্ম হ্যান্ডলিং",
    emoji: "📝",
  },
  {
    href: "/docs/axios",
    title: "Axios",
    description: "HTTP রিকোয়েস্ট হ্যান্ডলিং",
    emoji: "🌐",
  },
  {
    href: "/docs/framer-motion",
    title: "Framer Motion",
    description: "স্মুথ React অ্যানিমেশন",
    emoji: "✨",
  },
  {
    href: "/docs/tailwindcss",
    title: "Tailwind CSS",
    description: "দ্রুত রেসপনসিভ UI",
    emoji: "🎨",
  },
  {
    href: "/docs/shadcn-ui",
    title: "Shadcn UI",
    description: "রেডিমেড UI কম্পোনেন্ট",
    emoji: "🧩",
  },
  {
    href: "/docs/laravel",
    title: "Laravel",
    description: "অফিসিয়াল ডকুমেন্টেশন ভিত্তিক",
    emoji: "🐘",
  },
  {
    href: "/docs/php-oop",
    title: "PHP OOP",
    description: "অবজেক্ট-ওরিয়েন্টেড PHP",
    emoji: "🐘",
  },
  {
    href: "/docs/projects",
    title: "Complete Projects",
    description: "রিয়েল-ওয়ার্ল্ড প্রজেক্ট",
    emoji: "🚀",
  },
  {
    href: "/docs/career",
    title: "Career ও Developer Hacks",
    description: "ক্যারিয়ার পরামর্শ",
    emoji: "💼",
  },
  {
    href: "/docs/productive-muslim",
    title: "Productive Muslim",
    description: "দুনিয়া ও আখিরাতের ব্যালেন্সে প্রোডাক্টিভ হওয়ার গাইড",
    emoji: "🕌",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold sm:text-5xl">
          React Bangla তে <span className="text-fd-primary">বাংলায়</span>{" "}
          প্রোগ্রামিং শিখুন
        </h1>
        <p className="max-w-2xl text-base text-fd-muted-foreground sm:text-lg">
          {siteDescription}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/react"
            className="rounded-lg bg-fd-primary px-5 py-2.5 font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            React শেখা শুরু করুন
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border px-5 py-2.5 font-medium transition-colors hover:bg-fd-accent"
          >
            সব টিউটোরিয়াল দেখুন
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20">
        <h2 className="mb-6 text-center text-xl font-semibold sm:text-2xl">
          সব টিউটোরিয়াল একই জায়গায়
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex flex-col gap-2 rounded-xl border bg-fd-card p-5 transition-colors hover:border-fd-primary hover:bg-fd-accent"
            >
              <span className="text-2xl" aria-hidden>
                {c.emoji}
              </span>
              <span className="font-semibold">{c.title}</span>
              <span className="text-sm text-fd-muted-foreground">
                {c.description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
