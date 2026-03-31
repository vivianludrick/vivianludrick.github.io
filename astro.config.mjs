// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: 'https://vivianludrick.github.io',

  integrations: [svelte(), sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  },

  markdown:{
      shikiConfig:{
          theme: 'catppuccin-macchiato'
      }
  }
});
