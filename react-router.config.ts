import type { Config } from "@remix-run/dev/config";

export default {
  appDirectory: "app",
  browserBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  devServerPort: 8002,
  ignoredRouteFiles: ["**/.*"],
} satisfies Config;
