#!/usr/bin/env node
/**
 * One-off migration tool: converts the old Nextra-based `pages/` content tree
 * (react-bangla-tutorial) into the new Fumadocs `content/docs/` tree
 * (react-bangla), split into multiple "root folder" collections (React,
 * Next.js, Git, JavaScript, Redux, React Router, React Query, Laravel, PHP
 * OOP, Shadcn UI, Tailwind CSS, Framer Motion, Axios, Projects, Career).
 *
 * Usage: node scripts/migrate-content.mjs   (run from react-bangla/ directory)
 *
 * This is a dev-time tool, not part of the running app.
 */
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

const NEW_ROOT = process.cwd();
const OLD_ROOT = path.resolve(NEW_ROOT, '..');
const OLD_PAGES = path.join(OLD_ROOT, 'pages');
const NEW_DOCS = path.join(NEW_ROOT, 'content', 'docs');

const SKIP_FILES = new Set(['_app.tsx', '_document.tsx', '404.mdx', '_meta.json']);

/** Strips emoji / pictographic decoration anywhere in a title, e.g. "1️⃣ ", "📂 ", "🔗 ", "🧑 " */
function stripDecoration(title) {
  return title
    .replace(/[\u{1F000}-\u{1FFFF}\u{2190}-\u{2BFF}\u{2600}-\u{27BF}\uFE0F\u20E3]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function humanize(slug) {
  return slug
    .replace(/^\d+-/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function firstHeading(body) {
  const m = body.match(/^#{1,3}\s+(.+)$/m);
  if (!m) return null;
  return m[1].replace(/[*_`]/g, '').trim();
}

function firstParagraph(body) {
  for (const raw of body.split('\n')) {
    const t = raw.trim();
    if (!t) continue;
    if (t.startsWith('#')) continue;
    if (t.startsWith('import ')) continue;
    if (t.startsWith('export ')) continue;
    if (t.startsWith('<')) continue;
    if (t.startsWith('```')) break;
    if (t.startsWith('---')) continue;
    if (t.startsWith('|')) continue;
    const clean = t
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();
    if (clean.length > 15) return clean;
  }
  return null;
}

function truncate(str, n) {
  if (str.length <= n) return str;
  const cut = str.slice(0, n - 1);
  const lastSpace = cut.lastIndexOf(' ');
  const safe = lastSpace > n * 0.6 ? cut.slice(0, lastSpace) : cut;
  return safe.trimEnd() + '…';
}

function lowerSlug(name) {
  const ext = path.extname(name);
  const base = ext ? name.slice(0, -ext.length) : name;
  return base.toLowerCase() + ext.toLowerCase();
}

/**
 * Ensures the mdx content has `title` + `description` frontmatter.
 * Leaves already-complete frontmatter untouched (byte-for-byte).
 */
function ensureFrontmatter(rawContent, titleHint, fallbackName) {
  const parsed = matter(rawContent);
  const data = { ...parsed.data };
  let changed = false;

  if (!data.title) {
    data.title =
      (titleHint && stripDecoration(titleHint)) ||
      (firstHeading(parsed.content) && stripDecoration(firstHeading(parsed.content))) ||
      humanize(fallbackName);
    changed = true;
  }
  if (!data.description) {
    const p = firstParagraph(parsed.content);
    data.description = p
      ? truncate(p, 155)
      : `${data.title} - React Bangla তে বাংলা ভাষায় ধাপে ধাপে শিখুন।`;
    changed = true;
  }

  if (!changed) return rawContent;
  return matter.stringify(parsed.content.length ? parsed.content : '\n', data);
}

function readOldMeta(dirAbs) {
  const p = path.join(dirAbs, '_meta.json');
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Recursively copies a directory from the old `pages` tree into a
 * destination folder under content/docs, converting _meta.json -> meta.json
 * and injecting frontmatter title/description where missing.
 */
function copyDir(srcAbs, destAbs) {
  if (!fs.existsSync(srcAbs)) {
    console.warn(`  ! missing dir, skipped: ${srcAbs}`);
    return;
  }
  fs.mkdirSync(destAbs, { recursive: true });
  const oldMeta = readOldMeta(srcAbs) || {};
  const entries = fs.readdirSync(srcAbs, { withFileTypes: true });

  const slugForEntry = new Map();

  for (const entry of entries) {
    if (SKIP_FILES.has(entry.name)) continue;

    if (entry.isDirectory()) {
      const destName = lowerSlug(entry.name);
      copyDir(path.join(srcAbs, entry.name), path.join(destAbs, destName));
      slugForEntry.set(entry.name, destName);
      slugForEntry.set(entry.name.toLowerCase(), destName);
    } else if (entry.name.endsWith('.mdx')) {
      const destName = lowerSlug(entry.name);
      const slug = destName.replace(/\.mdx$/, '');
      const srcFile = path.join(srcAbs, entry.name);
      const raw = fs.readFileSync(srcFile, 'utf8');

      const bareName = entry.name.replace(/\.mdx$/, '');
      const metaKey = Object.keys(oldMeta).find((k) => k.toLowerCase() === bareName.toLowerCase());
      const metaVal = metaKey ? oldMeta[metaKey] : undefined;
      const titleHint = typeof metaVal === 'string' ? metaVal : metaVal?.title;

      const out = ensureFrontmatter(raw, titleHint, slug);
      fs.writeFileSync(path.join(destAbs, destName), out, 'utf8');
      slugForEntry.set(bareName, slug);
      slugForEntry.set(bareName.toLowerCase(), slug);
    }
  }

  const pages = [];
  for (const key of Object.keys(oldMeta)) {
    const slug = slugForEntry.get(key) || slugForEntry.get(key.toLowerCase());
    if (slug) pages.push(slug);
  }
  if (pages.length) {
    pages.push('...');
    writeMetaJson(destAbs, { pages });
  }
}

function writeMetaJson(destAbs, data) {
  const metaPath = path.join(destAbs, 'meta.json');
  let existing = {};
  if (fs.existsSync(metaPath)) {
    existing = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  }
  fs.writeFileSync(metaPath, JSON.stringify({ ...existing, ...data }, null, 2) + '\n', 'utf8');
}

function copyFile(srcRel, destAbs, titleHint) {
  const srcFile = path.join(OLD_PAGES, srcRel);
  if (!fs.existsSync(srcFile)) {
    console.warn(`  ! missing file, skipped: ${srcRel}`);
    return;
  }
  fs.mkdirSync(path.dirname(destAbs), { recursive: true });
  const raw = fs.readFileSync(srcFile, 'utf8');
  const base = path.basename(destAbs).replace(/\.mdx$/, '');
  const out = ensureFrontmatter(raw, titleHint, base);
  fs.writeFileSync(destAbs, out, 'utf8');
}

function makeCollection({ dest, title, description, icon, build }) {
  const destAbs = path.join(NEW_DOCS, dest);
  fs.mkdirSync(destAbs, { recursive: true });
  console.log(`\n=> Collection: ${dest}`);
  build(destAbs);
  writeMetaJson(destAbs, { title, description, icon, root: true });
}

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

makeCollection({
  dest: 'react',
  title: 'React',
  description: 'ধাপে ধাপে বাংলায় React.js শিখুন — বেসিক থেকে অ্যাডভান্সড প্যাটার্ন পর্যন্ত।',
  icon: 'Atom',
  build(destAbs) {
    copyFile('index.mdx', path.join(destAbs, 'index.mdx'), '১. কোর্স ইন্ট্রোডাকশন');
    copyFile(
      'learn-react-quick-start-guide.mdx',
      path.join(destAbs, 'quick-start-guide.mdx'),
      '২. Quick Start',
    );
    copyFile('thinking-in-react.mdx', path.join(destAbs, 'thinking-in-react.mdx'), '৩. Thinking in React');
    copyFile(
      'learn-react-environment-set-up.mdx',
      path.join(destAbs, 'environment-set-up.mdx'),
      '৪. Environment Set Up',
    );

    const folderTitles = {
      'learn-react-describing-the-ui': 'Describing the UI',
      'learn-react-adding-interactivity': 'Adding Interactivity',
      'learn-react-managing-state': 'Managing State',
      'learn-react-escape-hatches': 'Escape Hatches',
    };
    for (const name of [
      'learn-react-describing-the-ui',
      'learn-react-adding-interactivity',
      'learn-react-managing-state',
      'learn-react-escape-hatches',
    ]) {
      const destFolder = path.join(destAbs, name.replace('learn-react-', ''));
      copyFile(`${name}.mdx`, path.join(destFolder, 'index.mdx'));
      copyDir(path.join(OLD_PAGES, name), destFolder);
      writeMetaJson(destFolder, { title: folderTitles[name] });
    }

    copyFile('react-suspense.mdx', path.join(destAbs, 'react-suspense.mdx'));
    copyFile('react-lazy-loading.mdx', path.join(destAbs, 'react-lazy-loading.mdx'));
    copyFile('hundred-react-interview-questions.mdx', path.join(destAbs, 'interview-questions.mdx'));

    const patternsDir = path.join(destAbs, 'design-patterns');
    copyFile('react-design-patterns.mdx', path.join(patternsDir, 'index.mdx'));
    copyDir(path.join(OLD_PAGES, 'react-design-pattern'), patternsDir);
    writeMetaJson(patternsDir, { title: 'Design Patterns' });

    writeMetaJson(destAbs, {
      pages: [
        'index',
        'quick-start-guide',
        'thinking-in-react',
        'environment-set-up',
        'describing-the-ui',
        'adding-interactivity',
        'managing-state',
        'escape-hatches',
        'react-suspense',
        'react-lazy-loading',
        'design-patterns',
        'interview-questions',
      ],
    });
  },
});

makeCollection({
  dest: 'nextjs',
  title: 'Next.js',
  description: 'বাংলায় Next.js অফিসিয়াল ডকুমেন্টেশন ভিত্তিক সম্পূর্ণ টিউটোরিয়াল।',
  icon: 'Layers',
  build(destAbs) {
    copyDir(path.join(OLD_PAGES, 'nextjs-tutorial'), destAbs);
    copyFile(
      path.join('common-features', 'next-js-dark-mode.mdx'),
      path.join(destAbs, 'dark-mode.mdx'),
      'Dark Mode',
    );
  },
});

makeCollection({
  dest: 'git',
  title: 'Git ও GitHub',
  description: 'বাংলায় Git ও GitHub ব্যবহার শিখুন — ভার্সন কন্ট্রোল থেকে কোলাবোরেশন পর্যন্ত।',
  icon: 'GitBranch',
  build(destAbs) {
    copyDir(path.join(OLD_PAGES, 'git-tutorial'), destAbs);
  },
});

makeCollection({
  dest: 'javascript',
  title: 'JavaScript',
  description: 'বাংলায় JavaScript এর গুরুত্বপূর্ণ কনসেপ্ট ও মেথডসমূহ।',
  icon: 'Braces',
  build(destAbs) {
    copyDir(path.join(OLD_PAGES, 'javascript-tutorial'), destAbs);
  },
});

makeCollection({
  dest: 'redux',
  title: 'Redux',
  description: 'বাংলায় Redux Toolkit ও RTK Query দিয়ে স্টেট ম্যানেজমেন্ট শিখুন।',
  icon: 'Boxes',
  build(destAbs) {
    copyDir(path.join(OLD_PAGES, 'redux-tutorial'), destAbs);
  },
});

makeCollection({
  dest: 'react-router',
  title: 'React Router',
  description: 'বাংলায় React Router ব্যবহার করে ক্লায়েন্ট-সাইড রাউটিং শিখুন।',
  icon: 'Route',
  build(destAbs) {
    copyDir(path.join(OLD_PAGES, 'react-router-tutorial'), destAbs);
  },
});

makeCollection({
  dest: 'react-query',
  title: 'React Query',
  description: 'বাংলায় TanStack React Query দিয়ে সার্ভার-স্টেট ও ডাটা ফেচিং শিখুন।',
  icon: 'RefreshCw',
  build(destAbs) {
    copyDir(path.join(OLD_PAGES, 'react-query-tutorial'), destAbs);
  },
});

makeCollection({
  dest: 'react-hook-form',
  title: 'React Hook Form',
  description: 'বাংলায় React Hook Form দিয়ে পারফরম্যান্ট ও সহজ ফর্ম তৈরি করা শিখুন।',
  icon: 'ListChecks',
  build(destAbs) {
    copyFile('react-hook-form-tutorial.mdx', path.join(destAbs, 'index.mdx'), 'React Hook Form');
  },
});

makeCollection({
  dest: 'axios',
  title: 'Axios',
  description: 'বাংলায় Axios দিয়ে HTTP রিকোয়েস্ট হ্যান্ডেল করা শিখুন।',
  icon: 'ArrowLeftRight',
  build(destAbs) {
    copyFile('axios-complete-tutorial.mdx', path.join(destAbs, 'index.mdx'), 'Axios HTTP Requests');
  },
});

makeCollection({
  dest: 'framer-motion',
  title: 'Framer Motion',
  description: 'বাংলায় Framer Motion দিয়ে React অ্যানিমেশন তৈরি করা শিখুন।',
  icon: 'Sparkles',
  build(destAbs) {
    copyFile('framer-motion-animation.mdx', path.join(destAbs, 'index.mdx'), 'Framer Motion Animation');
  },
});

makeCollection({
  dest: 'tailwindcss',
  title: 'Tailwind CSS',
  description: 'বাংলায় Tailwind CSS দিয়ে দ্রুত ও রেসপনসিভ UI বানানো শিখুন।',
  icon: 'Palette',
  build(destAbs) {
    copyFile('learn-tailwindcss-in-bangla.mdx', path.join(destAbs, 'index.mdx'), 'Tailwind CSS');
  },
});

makeCollection({
  dest: 'shadcn-ui',
  title: 'Shadcn UI',
  description: 'বাংলায় Shadcn UI কম্পোনেন্ট লাইব্রেরি ব্যবহার শিখুন।',
  icon: 'Component',
  build(destAbs) {
    copyDir(path.join(OLD_PAGES, 'shadcn-ui'), destAbs);
  },
});

makeCollection({
  dest: 'laravel',
  title: 'Laravel',
  description: 'বাংলায় Laravel অফিসিয়াল ডকুমেন্টেশন ভিত্তিক সম্পূর্ণ গাইড।',
  icon: 'Server',
  build(destAbs) {
    copyDir(path.join(OLD_PAGES, 'laravel-official'), destAbs);
  },
});

makeCollection({
  dest: 'php-oop',
  title: 'PHP OOP',
  description: 'বাংলায় PHP অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং (OOP) শিখুন।',
  icon: 'FileCode',
  build(destAbs) {
    copyFile('php-oop-bangla.mdx', path.join(destAbs, 'index.mdx'), 'PHP OOP পরিচিতি');
    copyDir(path.join(OLD_PAGES, 'php-oop-bangla'), destAbs);
  },
});

makeCollection({
  dest: 'projects',
  title: 'Complete Projects',
  description: 'বাংলায় স্টেপ বাই স্টেপ সম্পূর্ণ রিয়েল-ওয়ার্ল্ড প্রজেক্ট তৈরি করা শিখুন।',
  icon: 'Rocket',
  build(destAbs) {
    copyFile('complete-projects.mdx', path.join(destAbs, 'index.mdx'), 'সম্পূর্ণ প্রজেক্টসমূহ');
    copyDir(path.join(OLD_PAGES, 'complete-projects'), destAbs);
  },
});

makeCollection({
  dest: 'career',
  title: 'Career ও Developer Hacks',
  description: 'ডেভেলপার ক্যারিয়ার, জব সার্কুলার ও প্রোডাক্টিভিটি নিয়ে বাংলা পরামর্শ।',
  icon: 'Briefcase',
  build(destAbs) {
    copyFile(
      'seven-hard-truths-for-new-developers.mdx',
      path.join(destAbs, 'seven-hard-truths-for-new-developers.mdx'),
    );
    copyFile(
      'how-to-be-a-world-class-frontend-engineer.mdx',
      path.join(destAbs, 'how-to-be-a-world-class-frontend-engineer.mdx'),
    );
    copyFile(
      'software-development-lifecycle.mdx',
      path.join(destAbs, 'software-development-lifecycle.mdx'),
    );
    copyDir(path.join(OLD_PAGES, 'developer-hacks'), path.join(destAbs, 'developer-hacks'));
    copyDir(path.join(OLD_PAGES, 'job-circular'), path.join(destAbs, 'job-circular'));
    writeMetaJson(destAbs, {
      pages: [
        'seven-hard-truths-for-new-developers',
        'how-to-be-a-world-class-frontend-engineer',
        'software-development-lifecycle',
        'developer-hacks',
        'job-circular',
      ],
    });
  },
});

console.log('\nDone. Review content/docs/ output, then fix flagged manual items:');
console.log(' - react/index.mdx, react/thinking-in-react.mdx (raw-loader imports)');
console.log(' - react/describing-the-ui/understanding-your-ui-as-a-tree.mdx (raw-loader imports)');
console.log(' - framer-motion/index.mdx (raw-loader imports)');
console.log(" - react/adding-interactivity/state-a-component-memory.mdx (CoursePromotion import path)");
