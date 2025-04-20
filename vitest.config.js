import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    coverage: {
      provider: "c8",
      reporter: ["text", "json", "html"],
      exclude: ["**/node_modules/**", "**/*.config.js", "**/tests/setup.js"],
    },
  },
});
