import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/main.d.ts",
          dest: "",
        },
      ],
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: "./src/main.js",
      name: "simple-hue-picker",
      fileName: "simple-hue-picker",
    },
  },
});
