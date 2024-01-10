import React from 'react';
import { DetailsLayout } from '@/stories/StoryComponents/Layouts/DetailsLayout';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, type Props_Button } from '@/components/react/Button';

const DisplayButtonDetails: React.FC<{ text: string; defaultIcon: boolean }> = ({ text, defaultIcon }) => {
    const buttons = React.useMemo(() => {
        return [
            { intent: 'primary', status: 'normal', text, defaultIcon },
            { intent: 'primary', status: 'hover', text, defaultIcon },
            { intent: 'primary', status: 'disabled', text, defaultIcon },
            { intent: 'secondary', status: 'normal', text, defaultIcon },
            { intent: 'secondary', status: 'hover', text, defaultIcon },
            { intent: 'secondary', status: 'disabled', text, defaultIcon },
            { intent: 'outline', status: 'normal', text, defaultIcon },
            { intent: 'outline', status: 'hover', text, defaultIcon },
            { intent: 'outline', status: 'disabled', text, defaultIcon },
            { intent: 'subtle', status: 'normal', text, defaultIcon },
            { intent: 'subtle', status: 'hover', text, defaultIcon },
            { intent: 'subtle', status: 'disabled', text, defaultIcon },
            { intent: 'cart', status: 'normal', text, defaultIcon },
            { intent: 'cart', status: 'hover', text, defaultIcon },
            { intent: 'cart', status: 'disabled', text, defaultIcon },
            { intent: 'alert', status: 'normal', text, defaultIcon },
            { intent: 'alert', status: 'hover', text, defaultIcon },
            { intent: 'alert', status: 'disabled', text, defaultIcon },
        ] as Props_Button[];
    }, [text, defaultIcon]);
    return (
        <DetailsLayout<Props_Button>
            title="XQ Buttons"
            fields={['Name', 'Status', 'Demo', 'Border', 'Background', 'Text Color', 'Icon Color', 'Opacity']}
            items={buttons}
            Component={Button}
            queryStr="button.xq-btn"
            sizes={['md', 'lg']}
        />
    );
};

const meta: Meta<typeof DisplayButtonDetails> = {
    title: 'XQ/Component/Button/Details',
    component: DisplayButtonDetails,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        text: { control: 'text' },
    },
};
export default meta;

export const Details: StoryObj<typeof DisplayButtonDetails> = {
    args: {
        text: '產品服務',
        defaultIcon: true,
    },
};