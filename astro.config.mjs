import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://fredriketsare.se',
  integrations: [mdx(), sitemap()],
  adapter: cloudflare(),
});