import { defineConfig } from 'tsup';
import { existsSync, readdirSync } from 'node:fs';

const componentEntries = Object.fromEntries(
  readdirSync('src', { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .flatMap(({ name }) => {
      const tsxEntry = `src/${name}/index.tsx`;
      const tsEntry = `src/${name}/index.ts`;
      const entry = existsSync(tsxEntry) ? tsxEntry : existsSync(tsEntry) ? tsEntry : null;
      return entry ? [[`${name}/index`, entry]] : [];
    })
);

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    ...componentEntries,
  },
  format: ['esm', 'cjs'],
  dts: false,
  bundle: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
});
