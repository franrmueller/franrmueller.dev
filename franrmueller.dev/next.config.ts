// next.config.ts
import path from "node:path";
import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  webpack(config: any) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Force runtime + build-time to resolve to the local generated dir
      "contentlayer/generated": path.join(process.cwd(), ".contentlayer/generated"),
    };
    return config;
  },
};

export default withContentlayer(nextConfig);