import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.irahospitality.co.in',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'auto', format: 'directory' },
  integrations: [
    sitemap({
      // Application forms are utility pages, keep them out of the sitemap
      filter: (page) => !page.includes('/careers/apply/') && !page.includes('/404'),
    }),
  ],
  image: { responsiveStyles: false },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
