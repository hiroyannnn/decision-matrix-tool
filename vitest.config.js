import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Next.jsのimportエイリアスをサポート
      "@": resolve(__dirname, "./"),
      "@components": resolve(__dirname, "./src/components"),
      "@styles": resolve(__dirname, "./styles"),
      "@pages": resolve(__dirname, "./pages"),
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    // Next.jsのページとコンポーネントを対象に含める
    include: [
      "./pages/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "./src/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    coverage: {
      provider: "c8",
      reporter: ["text", "json", "html"],
      exclude: [
        "**/node_modules/**",
        "**/*.config.js",
        "**/tests/setup.js",
        "**/.next/**",
        "**/out/**",
      ],
    },
  },
});
