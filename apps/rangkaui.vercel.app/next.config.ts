import path from "node:path";
import type { NextConfig } from "next";

const workspaceRoot = path.resolve(process.cwd(), "../..");

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  transpilePackages: ["@rangkaui/alpha"],
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;
