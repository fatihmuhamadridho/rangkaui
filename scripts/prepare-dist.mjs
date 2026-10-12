import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, readFileSync, writeFileSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
copyFileSync('dist/core/esm/index.css', 'dist/styles.css');

const componentNames = readdirSync('src', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => existsSync(`src/${name}/index.ts`) || existsSync(`src/${name}/index.tsx`));
const componentTypesDir = 'dist/lib/components';
mkdirSync(componentTypesDir, { recursive: true });

for (const name of componentNames) {
  renameSync(`dist/lib/${name}`, `${componentTypesDir}/${name}`);
}

const rootTypesPath = 'dist/lib/index.d.ts';
const rootTypes = readFileSync(rootTypesPath, 'utf8');
const componentExports = componentNames.reduce(
  (content, name) => content.replaceAll(`'./${name}'`, `'./components/${name}'`),
  rootTypes
);
writeFileSync(rootTypesPath, componentExports);
