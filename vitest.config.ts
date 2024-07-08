import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    name: "companyhero-api",
    root: "./src",
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});