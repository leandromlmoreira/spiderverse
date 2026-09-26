import type { NextConfig } from "next";

const basePath = "/spiderverse";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    API_URL: "https://64a54c6300c3559aa9bf7245.mockapi.io",
    BASE_PATH: basePath,
  },
};

export default nextConfig;
