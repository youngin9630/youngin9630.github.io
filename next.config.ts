import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // GitHub Pages용 설정 (youngin9630.github.io 도메인 사용)
  // assetPrefix와 basePath는 필요 없음
};

export default nextConfig;
