import { DisplayShadows } from '@/stories/StoryComponents/DisplayShadows';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DisplayShadows> = {
    title: 'XQ/StyleGuideline/Shadow',
    component: DisplayShadows, // 會暴露出來需要的 props
    parameters: {
        layout: 'fullscreen',
    },
};
export default meta;

export const XQShadows: StoryObj<typeof DisplayShadows> = {
    args: {
        shadows: [
            {
                title: 'shadow.sm',
                shadow: /*@tw:*/ 'shadow-[0px_0px_6px_0px_rgba(90,90,90,0.45)]',
                shadow_dark: /*@tw:*/ 'shadow-[0px_0px_6px_0px_rgba(154,154,154,0.45)]',
            },
            {
                title: 'shadow.md',
                shadow: /*@tw:*/ 'shadow-[0px_0px_12px_0px_rgba(122,122,122,0.4)]',
                shadow_dark: /*@tw:*/ 'shadow-[0px_0px_12px_0px_rgba(154,154,154,0.4)]',
            },
            {
                title: 'shadow.lg',
                shadow: /*@tw:*/ 'shadow-[0px_0px_24px_0px_rgba(154,154,154,0.35)]',
                shadow_dark: /*@tw:*/ 'shadow-[0px_0px_24px_0px_rgba(234,234,234,0.35)]',
            },
        ] /*)*/,
    },
};
