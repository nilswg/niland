import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { $config } from './lib/config';
const config = $config();
console.log('[astro.config.mjs] \n config: ', config);

// https://astro.build/config
export default defineConfig({
  base: config.baseUrl,
  integrations: [react(), tailwind()]
});