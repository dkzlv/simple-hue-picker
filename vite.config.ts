import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";
import banner2 from "rollup-plugin-banner2";

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
    {
      ...banner2((chunk) => {
        return chunk.name === "react" ? `"use client";` : "";
      }),
      apply: "build",
    },
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
