import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: { resolve: false },
  sourcemap: true,
  clean: false,
  treeshake: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".cjs",
    };
  },
});
