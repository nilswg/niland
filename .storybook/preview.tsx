import React from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { StoryContextProvider } from '../src/stories/StoryComponents/StoryContextProvider';
/**
 * tailwind
 *
 * Vite內置對PostCss支援，僅需添加post.config.js就可以作用，
 * postcss 能解析這裡的 tailwind.css 文件。
 */
import '../src/globals.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        // 全局樣式設定，背景色設置，為亮、暗兩種主題。
        backgrounds: {
            default: 'light',
            values: [
                { name: 'dark', value: '#000' },
                { name: 'light', value: '#fff' },
            ],
        },
        // 這個會讓預覽全螢幕， w-full 才不會超出。
        layout: 'fullscreen',
    },
};

export const decorators: Decorator[] = [
    (Story, context) => {
        return (
            <StoryContextProvider context={context}>
                <Story {...context} />
            </StoryContextProvider>
        );
    },
];

export default preview;
