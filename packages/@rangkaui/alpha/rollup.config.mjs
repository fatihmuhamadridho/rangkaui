import path from "node:path";
import { fileURLToPath } from "node:url";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json" with { type: "json" };

const cwd = path.dirname(fileURLToPath(import.meta.url));
const extensions = [".tsx", ".ts", ".jsx", ".js"];

export default {
  input: path.join(cwd, "src/index.ts"),
  external: ["react", "react-dom", "react/jsx-runtime"],
  plugins: [
    resolve({ extensions, browser: true }),
    commonjs(),
    typescript({
      tsconfig: path.join(cwd, "tsconfig.build.json"),
      declaration: false,
      declarationMap: false,
      importHelpers: false,
      rootDir: path.join(cwd, "src"),
      outDir: path.join(cwd, "dist"),
      sourceMap: true,
    }),
  ],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
};
