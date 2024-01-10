import path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { $args } from '../lib/args';
import { genXqColors } from './genXqColors';

console.log('[Storybook]', { args: $args() });

const config: StorybookConfig = {
    stories: ['../stories/Introduction.stories.tsx', '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-onboarding', '@storybook/addon-interactions'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    viteFinal: async (config) => {
        /**
         * 產生 xq-colors.json
         */
        genXqColors(path.resolve('./src/stories/StyleGuideline/Color/xq-colors.json'));

        /**
         * @see https://github.com/storybookjs/builder-vite/issues/85
         */
        return mergeConfig(config, {
            base: $args().basePath,
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, '../src'),
                    '@lib': path.resolve(__dirname, '../lib'),
                },
            },
            define: {
                ...config.define,
                global: 'window',
                __API_BASE__: JSON.stringify($args().apiBase),
            },
            server: {
                ...config.server,
                proxy: {
                    '/api': {
                        target: $args().apiBase, // ex: mockServer/api
                        changeOrigin: true,
                        rewrite: (path) => path.replace(/^\/api/, ''),
                    },
                },
            },
        });
    },
    // 告訴 storybook Next 的靜態目錄在哪裡，該如何轉換成路徑
    // @example: http://localhost:6006/next.svg
    staticDirs: [
        {
            from: path.resolve(__dirname, '../public'),
            to: '/',
        },
    ],
};
export default config;
