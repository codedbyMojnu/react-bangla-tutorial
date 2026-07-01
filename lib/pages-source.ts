import { pages } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const pagesSource = loader({
  baseUrl: '/',
  source: toFumadocsSource(pages, []),
});
