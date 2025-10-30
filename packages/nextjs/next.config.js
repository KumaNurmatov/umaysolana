const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true" || process.env.VERCEL === "1",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      http: false,
      https: false,
      zlib: false,
      path: false,
      os: false,
    };
    config.externals.push("pino-pretty", "lokijs", "encoding");

    // Fix for MetaMask SDK and other React Native dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve(__dirname),
      "~~": path.resolve(__dirname),
      "@react-native-async-storage/async-storage": false,
      "react-native": false,
    };

    return config;
  },
};

module.exports = nextConfig;
