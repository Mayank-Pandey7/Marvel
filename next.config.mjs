import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.infrastructureLogging = {
      level: "error",
    };
    config.module.rules.push({
      test: /\.html$/i,
      type: "asset/source",
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      "@designcodeio/threeui/style.css": path.resolve(__dirname, "src/shaders/threeui.css"),
      "@designcodeio/threeui": path.resolve(__dirname, "src/shaders/character-carousel/CharacterCarousel.tsx"),
    };
    return config;
  },
};

export default nextConfig;
