#!/usr/bin/env node
/**
 * Generates a simple landing `index.mdx` for any root collection folder
 * under content/docs that doesn't already have one, so the collection's
 * root URL (e.g. /docs/nextjs) renders a real page instead of 404.
 *
 * Usage: node scripts/generate-collection-indexes.mjs
 */
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

const NEW_DOCS = path.join(process.cwd(), 'content', 'docs');

function readMeta(dir) {
  const p = path.join(dir, 'meta.json');
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function titleOf(mdxPath) {
  if (!fs.existsSync(mdxPath)) return null;
  const { data, content } = matter(fs.readFileSync(mdxPath, 'utf8'));
  if (data.title) return data.title;
  const m = content.match(/^#{1,3}\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function resolvePageTitle(dir, slug) {
  const mdx = path.join(dir, `${slug}.mdx`);
  const idx = path.join(dir, slug, 'index.mdx');
  return titleOf(mdx) || titleOf(idx) || slug;
}

for (const entry of fs.readdirSync(NEW_DOCS, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = path.join(NEW_DOCS, entry.name);
  const indexPath = path.join(dir, 'index.mdx');
  if (fs.existsSync(indexPath)) continue;

  const meta = readMeta(dir);
  const title = meta.title || entry.name;
  const description = meta.description || `${title} - React Bangla তে বাংলা ভাষায় ধাপে ধাপে শিখুন।`;

  let pageSlugs = (meta.pages || []).filter((p) => p !== '...' && !p.startsWith('---') && !p.startsWith('['));
  if (pageSlugs.length === 0) {
    pageSlugs = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.endsWith('.mdx'))
      .map((e) => e.name.replace(/\.mdx$/, ''))
      .concat(fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name))
      .sort();
  }
  pageSlugs = pageSlugs.slice(0, 12);

  const cards = pageSlugs
    .map((slug) => {
      const pageTitle = resolvePageTitle(dir, slug);
      return `  <Card href="/docs/${entry.name}/${slug}" title="${pageTitle.replace(/"/g, "'")}" />`;
    })
    .join('\n');

  const content = `---
title: ${title}
description: ${description}
---

${description}

<Cards>
${cards}
</Cards>
`;

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log(`Created ${path.relative(process.cwd(), indexPath)}`);
}
