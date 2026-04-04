import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://fredriketsare.se',
	i18n: {
		defaultLocale: 'sv',
		locales: ['sv', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	integrations: [mdx(), sitemap()],
});
