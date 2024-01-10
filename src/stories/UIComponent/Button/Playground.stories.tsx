import type { FC } from 'react';
import { PlaygroundLayout, type ResizeType } from '@/stories/StoryComponents/Layouts/PlaygroundLayout';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, type Props_Button } from '@/components/react/Button';

const ButtonPlayground: FC<Omit<Props_Button, 'theme'> & { resize: ResizeType }> = (props) => {
    return (
        <PlaygroundLayout<Props_Button> resize={props.resize} minWidth={120}>
            <Button {...props} className={'w-full'} defaultIcon/>
        </PlaygroundLayout>
    );
};

const meta: Meta<typeof ButtonPlayground> = {
    title: 'XQ/Component/Button/Playground',
    component: ButtonPlayground,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        resize: { control: 'select', options: ['hug', 'fill', 'resize-x'] },
    },
};
export default meta;

export const Playground: StoryObj<typeof ButtonPlayground> = {
    args: {
        intent: 'primary',
        status: 'normal',
        size: 'md',
        text: '產品服務',
        resize: 'hug',
    },
};