import Link from "next/link";

const quickLinks = [
  { href: "/docs/react/quick-start-guide", label: "🚀 Quick Start Guide" },
  { href: "/docs/react/describing-the-ui", label: "🎨 Describing The UI" },
  { href: "/docs/react/adding-interactivity", label: "⚡ Adding Interactivity" },
  { href: "/docs/react/managing-state", label: "🔄 Managing State" },
  { href: "/docs/react/thinking-in-react", label: "🧠 Thinking in React" },
  { href: "/docs/projects", label: "💻 সম্পূর্ণ প্রজেক্টসমূহ" },
];

export default function Custom404Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-clip-text text-8xl font-bold text-transparent">
        404
      </div>

      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">পেজ খুঁজে পাওয়া যায়নি</h1>

      <p className="mb-10 max-w-xl text-base text-fd-muted-foreground sm:text-lg">
        দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি আর বিদ্যমান নেই অথবা সরানো হয়েছে। 🙁
        <br />
        নিচের লিংক থেকে আপনি আমাদের টিউটোরিয়াল পেজগুলোতে যেতে পারেন।
      </p>

      <div className="mb-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#667eea]/30 transition-transform hover:scale-105"
        >
          🏠 হোমপেজে যান
        </Link>
        <Link
          href="/docs/react/quick-start-guide"
          className="rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#10b981]/30 transition-transform hover:scale-105"
        >
          📚 React শিখা শুরু করুন
        </Link>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border bg-fd-card p-8 shadow-sm">
        <h3 className="mb-6 flex items-center justify-center gap-2 text-2xl font-bold">🤔 কি খুঁজছিলেন?</h3>
        <div className="grid grid-cols-1 gap-4 text-base sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg p-2 text-fd-primary transition-colors hover:bg-fd-primary/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-fd-muted-foreground">
        সমস্যা অব্যাহত থাকলে{" "}
        <Link
          href="https://github.com/codedbyMojnu/react-bangla/issues"
          target="_blank"
          className="text-fd-primary underline"
        >
          GitHub এ রিপোর্ট করুন
        </Link>
      </div>
    </div>
  );
}
