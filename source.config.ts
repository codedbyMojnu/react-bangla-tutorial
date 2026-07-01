import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      keywords: z.string().optional(),
      image: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Standalone site pages (about, resume, sponsor, etc.) that aren't part of
// any tutorial collection, rendered outside of the docs sidebar/layout.
export const pages = defineCollections({
  type: 'doc',
  dir: 'content/pages',
  schema: pageSchema.extend({
    keywords: z.string().optional(),
    image: z.string().optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
