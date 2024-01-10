import React, { type FC } from 'react';
import { OverviewLayout } from '@/stories/StoryComponents/Layouts/OverviewLayout';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, type Props_Button } from '@/components/react/Button';

const ButtonOverview: FC<{ text: string; defaultIcon: boolean }> = ({ text, defaultIcon }) => {
    const buttons: Props_Button[] = React.useMemo(() => {
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
        ];
    }, [text]);
    return (
        <OverviewLayout<Props_Button> title="XQ Buttons Overview" sizes={['md', 'lg']}>
            {buttons.map((props, i) => {
                return <Button {...props} key={i} />;
            })}
        </OverviewLayout>
    );
};

const meta: Meta<typeof ButtonOverview> = {
    title: 'XQ/Component/Button/Overview',
    component: ButtonOverview,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        text: { control: 'text' },
    },
};
export default meta;

export const Overview: StoryObj<typeof ButtonOverview> = {
    args: {
        text: '產品服務',
        defaultIcon: true,
    },
};