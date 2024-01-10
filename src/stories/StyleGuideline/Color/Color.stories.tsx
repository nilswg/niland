import { DisplayColors } from '@/stories/StoryComponents/DisplayColors';
import type { Meta, StoryObj } from '@storybook/react';
import xqColors from './xq-colors.json';

const meta: Meta<typeof DisplayColors> = {
    title: 'XQ/StyleGuideline/Color',
    component: DisplayColors, // 會暴露出來需要的 props
    parameters: {
        layout: 'centered',
    },
};

export default meta;

export const AllColors: StoryObj<typeof DisplayColors> = {
    args: {
        colors: xqColors.colors,
    },
};
