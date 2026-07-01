import nextVitals from 'eslint-config-next/core-web-vitals';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.source/**',
    // Teaching/example snippets rendered inside <LiveCodeEditor />; intentionally
    // include patterns (including anti-patterns for lessons) not meant to pass
    // the app's own lint rules.
    'examples/**',
  ]),
]);

export default eslintConfig;