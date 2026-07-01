<div align="center">

# React Bangla Tutorial 🇧🇩

**সহজ বাংলায় React, Next.js, JavaScript এবং আরও অনেক কিছু শিখুন**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-react--bangla.vercel.app-0070f3?style=for-the-badge)](https://react-bangla.vercel.app)
[![License](https://img.shields.io/github/license/codedbyMojnu/react-bangla-tutorial?style=for-the-badge&color=green)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/codedbyMojnu/react-bangla-tutorial?style=for-the-badge&color=yellow)](https://github.com/codedbyMojnu/react-bangla-tutorial/stargazers)
[![Forks](https://img.shields.io/github/forks/codedbyMojnu/react-bangla-tutorial?style=for-the-badge&color=orange)](https://github.com/codedbyMojnu/react-bangla-tutorial/network/members)
[![Contributors](https://img.shields.io/github/contributors/codedbyMojnu/react-bangla-tutorial?style=for-the-badge&color=blueviolet)](https://github.com/codedbyMojnu/react-bangla-tutorial/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/codedbyMojnu/react-bangla-tutorial?style=for-the-badge&color=red)](https://github.com/codedbyMojnu/react-bangla-tutorial/issues)

</div>

---

## 🎯 প্রজেক্ট সম্পর্কে

**React Bangla Tutorial** একটি ওপেন সোর্স প্রজেক্ট — যেখানে React, Next.js, JavaScript, Git, Redux, Framer Motion, Laravel, PHP OOP সহ একাধিক টেকনোলজির স্টেপ-বাই-স্টেপ টিউটোরিয়াল **সহজ বাংলায়** লেখা হয়েছে।

বাংলাদেশে লক্ষ লক্ষ তরুণ ডেভেলপার আছেন যারা ইংরেজি কনটেন্টের বাধায় পিছিয়ে পড়ছেন। আমাদের লক্ষ্য সেই বাধা দূর করে **মাতৃভাষায় প্রোগ্রামিং শেখার আনন্দ** সবার কাছে পৌঁছে দেওয়া।

---

## ✨ যা যা পাবেন

| বিষয়                | বিবরণ                                                  |
| -------------------- | ------------------------------------------------------ |
| 📘 React             | অফিসিয়াল ডকুমেন্টেশন অনুসরণ করে বাংলায় সম্পূর্ণ গাইড |
| ⚡ Next.js           | App Router, SSR, SSG — সব বাংলায়                      |
| 🌿 Git & GitHub      | প্র্যাকটিক্যাল উদাহরণ সহ ভার্সন কন্ট্রোল শেখা          |
| 🔄 Redux             | State management সহজ ভাষায়                            |
| 🎨 Framer Motion     | অ্যানিমেশন শেখা হাতে-কলমে                              |
| 🐘 Laravel & PHP OOP | ব্যাকএন্ড ডেভেলপমেন্টের বাংলা গাইড                     |
| 💻 লাইভ কোড এডিটর    | প্রতিটি উদাহরণ ব্রাউজারেই চেষ্টা করুন                  |
| 🔍 ফুল-টেক্সট সার্চ  | যেকোনো টপিক মুহূর্তেই খুঁজে পান                        |

---

## 🛠️ টেক স্ট্যাক

| লেয়ার      | টেকনোলজি                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| Framework   | [Next.js 16](https://nextjs.org/) (App Router)                                                                            |
| Docs Engine | [Fumadocs](https://fumadocs.dev/)                                                                                         |
| UI          | [Tailwind CSS v4](https://tailwindcss.com/)                                                                               |
| Content     | MDX                                                                                                                       |
| Font        | [Anek Bangla](https://fonts.google.com/specimen/Anek+Bangla) + [Baloo Da 2](https://fonts.google.com/specimen/Baloo+Da+2) |
| Deployment  | [Vercel](https://vercel.com/)                                                                                             |

---

## 🚀 লোকালে রান করুন

### ১. রিপোজিটরি ক্লোন করুন

```bash
git clone https://github.com/codedbyMojnu/react-bangla-tutorial.git
cd react-bangla-tutorial
```

### ২. ডিপেন্ডেন্সি ইনস্টল করুন

```bash
npm install
# অথবা
pnpm install
```

### ৩. ডেভেলপমেন্ট সার্ভার চালু করুন

```bash
npm run dev
```

ব্রাউজারে যান: **[http://localhost:3000](http://localhost:3000)**

### অন্যান্য কমান্ড

```bash
npm run build        # প্রোডাকশন বিল্ড
npm run start        # প্রোডাকশন সার্ভার
npm run types:check  # TypeScript চেক
npm run lint         # ESLint চেক
```

---

## 📂 প্রজেক্টের গঠন

```
react-bangla-tutorial/
├── app/                    # Next.js App Router
│   ├── (home)/             # হোমপেজ ও স্ট্যাটিক পেজ
│   ├── docs/               # ডকুমেন্টেশন লেআউট ও পেজ
│   ├── api/search/         # ফুল-টেক্সট সার্চ API
│   └── og/                 # ডায়নামিক OG ইমেজ জেনারেটর
├── content/
│   └── docs/               # ✏️ সমস্ত MDX টিউটোরিয়াল কনটেন্ট এখানে
│       ├── react/
│       ├── nextjs/
│       ├── javascript/
│       ├── git/
│       ├── redux/
│       └── ...
├── components/             # পুনর্ব্যবহারযোগ্য React কম্পোনেন্ট
├── lib/                    # Utilities & source adapter
├── public/                 # ছবি, ফন্ট, অডিও, ভিডিও
├── source.config.ts        # Fumadocs কনফিগারেশন
└── next.config.mjs         # Next.js কনফিগারেশন
```

> **নতুন টিউটোরিয়াল যোগ করতে চান?** শুধু `content/docs/` ফোল্ডারে একটি `.mdx` ফাইল তৈরি করুন — বাকি সব অটোমেটিক!

---

## 🤝 অবদান রাখুন — আপনাকেই দরকার!

এই প্রজেক্ট শুধু একজনের না — এটা **পুরো বাংলাদেশী ডেভেলপার কমিউনিটির**। আপনার একটি PR বা একটি typo fix হাজারো শিক্ষার্থীর উপকারে আসতে পারে।

### কীভাবে অবদান রাখবেন

```bash
# ১. রিপোজিটরি Fork করুন (উপরের Fork বাটনে ক্লিক করুন)

# ২. আপনার Fork ক্লোন করুন
git clone https://github.com/your-username/react-bangla-tutorial.git

# ৩. নতুন Branch তৈরি করুন
git checkout -b feature/your-topic-name

# ৪. পরিবর্তন করুন ও Commit করুন
git commit -m "docs: react useState বাংলা টিউটোরিয়াল যোগ করা হয়েছে"

# ৫. Push করুন
git push origin feature/your-topic-name

# ৬. Pull Request খুলুন ✅
```

### ✅ ভালো PR-এর জন্য টিপস

- বানান ও ব্যাকরণ শুদ্ধ রাখুন
- কোড উদাহরণ রান করে পরীক্ষা করুন
- [Conventional Commits](https://www.conventionalcommits.org/) স্টাইলে কমিট মেসেজ লিখুন
- বড় পরিবর্তনের আগে একটি [Issue](https://github.com/codedbyMojnu/react-bangla-tutorial/issues) খুলে আলোচনা করুন

### 💡 যেভাবে অবদান রাখতে পারেন

- 📝 নতুন টপিকের বাংলা টিউটোরিয়াল লিখুন
- 🐛 ভুল তথ্য বা typo ঠিক করুন
- 💻 কোড উদাহরণ উন্নত করুন
- 🌟 Issue রিপোর্ট করুন
- ⭐ Star দিয়ে সাপোর্ট করুন

---

## 👋 একটি ছোট্ট অনুরোধ

আপনি যদি এই রিপোজিটরিটি ভিজিট করে থাকেন, দয়া করে ⭐ **Star দিন** — এটা আমাদের জন্য অনেক বড় অনুপ্রেরণা এবং আরও ভালো কনটেন্ট তৈরিতে উৎসাহিত করে। ধন্যবাদ! 💙

---

## 🙌 Contributors

এই প্রজেক্টকে সমৃদ্ধ করতে যারা সময় ও মেধা দিয়েছেন — তাদের প্রতি আন্তরিক কৃতজ্ঞতা।

<a href="https://github.com/codedbyMojnu/react-bangla-tutorial/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=codedbyMojnu/react-bangla-tutorial" alt="Contributors" />
</a>

---

## ⭐ Stargazers

[![Stargazers repo roster](https://bytecrank.com/nastyox/reporoster/php/stargazersSVG.php?user=codedbyMojnu&repo=react-bangla-tutorial)](https://github.com/codedbyMojnu/react-bangla-tutorial/stargazers)

---

## 🍴 Forkers

[![Forkers repo roster](https://bytecrank.com/nastyox/reporoster/php/forkersSVG.php?user=codedbyMojnu&repo=react-bangla-tutorial)](https://github.com/codedbyMojnu/react-bangla-tutorial/network/members)

---

## 📚 সহায়ক রিসোর্স

- 📘 [React অফিসিয়াল ডকুমেন্টেশন](https://react.dev/)
- 📗 [Next.js অফিসিয়াল ডকুমেন্টেশন](https://nextjs.org/docs)
- 📙 [Fumadocs ডকুমেন্টেশন](https://fumadocs.dev/)
- 🎥 [LWS React Bangla Course](https://learnwithsumit.com/rnext)

---

## 📢 যোগাযোগ

প্রশ্ন, পরামর্শ বা সমস্যা থাকলে:

- 🐛 [Issue খুলুন](https://github.com/codedbyMojnu/react-bangla-tutorial/issues)
- 💬 [Discussion শুরু করুন](https://github.com/codedbyMojnu/react-bangla-tutorial/discussions)
- 🔀 [Pull Request পাঠান](https://github.com/codedbyMojnu/react-bangla-tutorial/pulls)

---

<div align="center">

আপনার প্রতিটি অবদান বাংলাদেশের হাজারো শিক্ষার্থীর কাছে জ্ঞানের আলো পৌঁছে দিচ্ছে।

**ধন্যবাদ — আপনিই আমাদের শক্তি। 💙**

Made with ❤️ for Bangladeshi developers

</div>

---

## 📄 লাইসেন্স

এই প্রজেক্টটি **[MIT License](./LICENSE)** এর অধীনে পরিচালিত।

এর মানে হলো আপনি এই কনটেন্ট ও কোড **বিনামূল্যে ব্যবহার, কপি, পরিবর্তন ও বিতরণ** করতে পারবেন — শুধু মূল লেখকের ক্রেডিট রাখুন।

```
Copyright (c) 2025 Md. Mojnu Miah
```
