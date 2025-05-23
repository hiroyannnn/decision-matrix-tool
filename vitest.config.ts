import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
    setupFiles: ["./tests/setup.tsx"],
    // Next.jsのページとコンポーネントを対象に含める
    include: [
      "./pages/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "./src/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "./tests/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    coverage: {
      provider: "istanbul",
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
