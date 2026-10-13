import { defineConfig } from 'tsup';
import { existsSync, readdirSync } from 'node:fs';

const componentEntries = Object.fromEntries(
  readdirSync('src', { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .flatMap(({ name }) => {
      const tsxEntry = `src/${name}/index.tsx`;
      const tsEntry = `src/${name}/index.ts`;
      const entry = existsSync(tsxEntry) ? tsxEntry : existsSync(tsEntry) ? tsEntry : null;
      return entry ? [[`components/${name}/index`, entry]] : [];
    })
);

const entries = {
  index: 'src/index.ts',
  ...componentEntries,
};

const shared = {
  entry: entries,
  dts: false,
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
};

export default defineConfig([
  {
    ...shared,
    format: ['cjs'],
    outDir: 'dist/cjs',
    outExtension() {
      return { js: '.cjs' };
    },
  },
  {
    ...shared,
    format: ['esm'],
    outDir: 'dist/esm',
    outExtension() {
      return { js: '.mjs' };
    },
  },
]);
