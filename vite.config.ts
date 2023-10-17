import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    dts(),
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
    minify: true,
    lib: {
      entry: ["./src/main.js", "./src/react.ts"],
      name: "simple-hue-picker",
    },
    rollupOptions: {
      external: ["react"],
      output: {},
    },
  },
});
