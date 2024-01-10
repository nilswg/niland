import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
// import react from "@astrojs/react";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import { $args } from './lib/args';

console.log('[Astro.Config]', { args: $args() });

// https://astro.build/config
export default defineConfig({
    site: $args().site,
    base: $args().basePath,
    integrations: [
        tailwind(),
        preact({
            include: ['**/react/**/*'],
            compat: true
        }),
        sitemap()
    ],
    vite: {
        server: {
            /**
             * @example
             * 
             * 原網址
             * http://localhost:4321/api/xxx
             * 
             * 會被代理到
             * http://localhost:5000/api/xxx (這是 mock server)
             * 
             */
            proxy: {
                '/api': {
                    target: $args().apiBase, // ex: mockServer/api
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        define: {
            __API_BASE__: JSON.stringify($args().apiBase),
        },
        ssr: {
            /**
             * @see https://github.com/withastro/astro/issues/7629
             * 
             * 此設置讓 react-icons 不會被 Node.js 載入使用。
             */
            noExternal: ["react-icons"]
        },
    }
});
