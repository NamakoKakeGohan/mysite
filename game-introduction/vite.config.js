import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api/steam": {
        target: "https://api.steampowered.com", // Steam Web APIのベースURL
        changeOrigin: true, // 必須: リクエストヘッダーのHostを変更
        rewrite: (path) => path.replace(/^\/api\/steam/, ""), // "/api/steam" を削除
      },
    },
  },
});
