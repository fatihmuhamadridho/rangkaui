import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const rootPackageJsonPath = path.join(repoRoot, "package.json");
const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, "utf8"));
const rootVersion = rootPackageJson.version;
const checkOnly = process.argv.includes("--check");

const targets = [];

function collectPackageJsonFiles(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".git" ||
      entry.name === ".next" ||
      entry.name === "dist"
    ) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const packageJsonPath = path.join(fullPath, "package.json");

      if (fs.existsSync(packageJsonPath)) {
        targets.push(packageJsonPath);
        continue;
      }

      collectPackageJsonFiles(fullPath);
    }
  }
}

collectPackageJsonFiles(path.join(repoRoot, "apps"));
collectPackageJsonFiles(path.join(repoRoot, "packages"));

const mismatches = [];

for (const packageJsonPath of targets) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  if (packageJson.version !== rootVersion) {
    mismatches.push({
      path: path.relative(repoRoot, packageJsonPath),
      currentVersion: packageJson.version,
    });

    if (!checkOnly) {
      packageJson.version = rootVersion;
      fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
    }
  }
}

if (mismatches.length === 0) {
  console.log(`All workspace package versions match root version ${rootVersion}.`);
  process.exit(0);
}

for (const mismatch of mismatches) {
  console.log(
    `${checkOnly ? "Version mismatch" : "Updated"}: ${mismatch.path} (${mismatch.currentVersion} -> ${rootVersion})`
  );
}

if (checkOnly) {
  process.exit(1);
}

