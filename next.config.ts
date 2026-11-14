import type { NextConfig } from "next";

const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
const normalizedBasePath = rawBasePath
  ? (rawBasePath.startsWith("/") ? rawBasePath : `/${rawBasePath}`).replace(/\/+$/, "")
  : undefined;

const nextConfig: NextConfig = {
  // "output: export" was removed — it is incompatible with `next start`.
  // To generate a static export when needed, temporarily add it back and run `next build`.
  // For dev and production server use, keep this commented out.
  // output: "export",
  ...(normalizedBasePath ? { basePath: normalizedBasePath } : {}),
  trailingSlash: true,
  reactStrictMode: false,
  poweredByHeader: false,
};

export default nextConfig;