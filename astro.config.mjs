// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: "https://blog.devmasnaodev.com/",
  integrations: [mdx(), sitemap(), react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});