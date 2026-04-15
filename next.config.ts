import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    const configuredApiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_PROXY_TARGET_URL ||
      "https://agendamento-nota-backend.vercel.app";
    return [
      {
        source: "/api/:path*",
        destination: `${configuredApiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
