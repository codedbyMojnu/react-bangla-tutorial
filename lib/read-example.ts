import fs from 'node:fs';
import path from 'node:path';

const EXAMPLES_ROOT = path.join(process.cwd(), 'examples');

/**
 * Reads a file from `examples/` at build/render time and returns its raw text.
 * This replaces the old webpack `!raw-loader!` pattern (not available in
 * Next.js App Router / Turbopack) for feeding source code into <LiveCodeEditor />.
 */
export function readExample(relativePath: string): string {
  return fs.readFileSync(path.join(EXAMPLES_ROOT, relativePath), 'utf8');
}
