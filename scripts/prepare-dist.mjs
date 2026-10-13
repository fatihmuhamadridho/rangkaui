import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
copyFileSync('dist/esm/index.css', 'dist/styles.css');
mkdirSync('dist/styles', { recursive: true });

const esmComponentsDir = 'dist/esm/components';
for (const entry of readdirSync(esmComponentsDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const componentCss = `${esmComponentsDir}/${entry.name}/index.css`;
  if (existsSync(componentCss)) {
    copyFileSync(componentCss, `dist/styles/${entry.name}.css`);
  }
}

for (const format of ['cjs', 'esm']) {
  const formatDir = `dist/${format}`;
  const removeCssOutputs = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filePath = `${directory}/${entry.name}`;
      if (entry.isDirectory()) removeCssOutputs(filePath);
      else if (entry.name.endsWith('.css') || entry.name.endsWith('.css.map')) rmSync(filePath);
    }
  };
  removeCssOutputs(formatDir);
}

const componentNames = readdirSync('src', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => existsSync(`src/${name}/index.ts`) || existsSync(`src/${name}/index.tsx`));
const componentTypesDir = 'dist/lib/components';
mkdirSync(componentTypesDir, { recursive: true });

for (const name of componentNames) {
  const sourcePath = `dist/lib/${name}`;
  const targetPath = `${componentTypesDir}/${name}`;
  cpSync(sourcePath, targetPath, { recursive: true, force: true });
  rmSync(sourcePath, { recursive: true, force: true });
}

const rootTypesPath = 'dist/lib/index.d.ts';
const rootTypes = readFileSync(rootTypesPath, 'utf8');
const componentExports = componentNames.reduce(
  (content, name) => content.replaceAll(`'./${name}'`, `'./components/${name}'`),
  rootTypes
);
writeFileSync(rootTypesPath, componentExports);
