import React, { isValidElement, memo } from 'react';
import type { ButtonHTMLAttributes, FC } from 'react';
import { cn, createVariants } from '@/utils/cn';
import type { StyledHTMLAttributes } from '@/utils/cn';
import { TbAlertCircle, TbChevronDown, TbChevronDownRight, TbShoppingCart } from 'react-icons/tb';
import { OutlineAlert, OutlineCart, OutlineChevronDownLarge } from '../Icon';

export const stylesButton = createVariants('xq-btn', {
    variants: {
        intent: {
            primary: '',
            secondary: '',
            outline: '',
            subtle: '',
            cart: '',
            alert: '',
        },
        // 透過外部強制指定按鈕狀態
        status: {
            normal: '',
            hover: '',
            disabled: 'pointer-events-none',
        },
        theme: {
            light: '',
            dark: '',
        },
        size: {
            md: 'h-[36px] rounded-[6px] px-[24px] py-[6px] xq-text-h4',
            lg: 'h-[48px] rounded-[12px] px-[24px] py-[12px] xq-text-h3',

            // TODO: 美術還沒有定義，自行解決小尺寸螢幕，導致 SegmentedControl 按鈕過小的問題。
            sm: 'rounded-[6px] py-[6px] xq-text-h5 md:h-[36px] md:px-[24px] md:xq-text-h4',
        },
    } /*)*/,
    compoundVariants: [
        /**
         * primary - light
         */
        {
            intent: 'primary',
            // theme: 'light',
            // status: 'normal',
            className: [
                '[&_p]:text-xq-gray-1 [&_path]:fill-xq-gray-1',
                'bg-gradient-to-b from-xq-blue-3 to-xq-blue-5', // --liner-white-b-01
                'hover:from-xq-blue-4 hover:to-xq-blue-5', // --liner-white-b-02
                'active:from-xq-blue-4 active:to-xq-blue-5', // --liner-white-b-02
            ],
        },
        {
            intent: 'primary',
            // theme: 'light',
            status: 'hover',
            className: ['bg-gradient-to-b from-xq-blue-4 to-xq-blue-5'], // --liner-white-b-02
        },
        {
            intent: 'primary',
            // theme: 'light',
            status: 'disabled',
            className: 'opacity-25',
        },
        /**
         * primary - dark
         */
        {
            intent: 'primary',
            theme: 'dark',
            className: [
                '[&_p]:text-xq-gray-1 [&_path]:fill-xq-gray-1',
                'bg-gradient-to-b from-xq-yellow-5 to-xq-yellow-4', // --liner-black-y-02
                'hover:from-xq-yellow-5 hover:to-xq-yellow-3', // --liner-black-y-01
                'active:from-xq-yellow-5 active:to-xq-yellow-3', // --liner-black-y-01
            ],
        },
        {
            intent: 'primary',
            theme: 'dark',
            status: 'hover',
            className: ['bg-gradient-to-b from-xq-yellow-5 to-xq-yellow-3'], // --liner-black-y-01
        },
        {
            intent: 'primary',
            theme: 'dark',
            status: 'disabled',
            className: 'opacity-25',
        },
        /**
         * secondary light
         */
        {
            intent: 'secondary',
            // theme: 'light',
            // status: 'normal',
            className: [
                'border-[1px] border-xq-blue-4 bg-transparent',
                'hover:border-xq-blue-6', //hover
                '[&_p]:text-xq-blue-4 [&_p]:hover:text-xq-blue-6',
                '[&_path]:fill-xq-blue-4 [&_path]:hover:fill-xq-blue-6',
            ],
        },
        {
            intent: 'secondary',
            // theme: 'light',
            status: 'hover',
            className: 'border-xq-blue-6 [&_p]:text-xq-blue-6 [&_path]:fill-xq-blue-6',
        },
        {
            intent: 'secondary',
            // theme: 'light',
            status: 'disabled',
            className: 'opacity-50',
        },
        /**
         * secondary dark
         */
        {
            intent: 'secondary',
            theme: 'dark',
            className: [
                'bg-transparent',
                'border-xq-yellow-4 hover:border-xq-yellow-6',
                '[&_p]:text-xq-yellow-4 [&_p]:hover:text-xq-yellow-6',
                '[&_path]:fill-xq-yellow-4 [&_path]:hover:fill-xq-yellow-6',
            ],
        },
        {
            intent: 'secondary',
            theme: 'dark',
            status: 'hover',
            className: 'border-xq-yellow-6 [&_p]:text-xq-yellow-6 [&_path]:fill-xq-yellow-6',
        },
        {
            intent: 'secondary',
            theme: 'dark',
            status: 'disabled',
            className: 'opacity-50',
        },
        /**
         * outline light
         */
        {
            intent: 'outline',
            theme: 'light',
            className: [
                'border-[1px] border-xq-border-outer',
                'bg-transparent',
                '[&_p]:text-xq-gray-7 [&_p]:hover:text-xq-blue-4',
                '[&_path]:fill-xq-gray-7 [&_path]:hover:fill-xq-blue-4',
            ],
        },
        {
            intent: 'outline',
            theme: 'light',
            status: 'hover',
            className: '[&_p]:text-xq-blue-4 [&_path]:fill-xq-blue-4',
        },
        {
            intent: 'outline',
            theme: 'light',
            status: 'disabled',
            className: 'opacity-50 [&_p]:text-xq-gray-7 [&_path]:fill-xq-gray-7',
        },
        /**
         * outline dark
         */
        {
            intent: 'outline',
            theme: 'dark',
            className: [
                'border-[1px] border-xq-border-outer',
                'bg-transparent',
                '[&_p]:text-xq-gray-7 [&_p]:hover:text-xq-yellow-4',
                '[&_path]:fill-xq-gray-7 [&_path]:hover:fill-xq-yellow-4',
            ],
        },
        {
            intent: 'outline',
            theme: 'dark',
            status: 'hover',
            className: '[&_p]:text-xq-yellow-4 [&_path]:fill-xq-yellow-4',
        },
        {
            intent: 'outline',
            theme: 'dark',
            status: 'disabled',
            className: 'opacity-50',
        },
        /**
         * subtle light
         */
        {
            intent: 'subtle',
            theme: 'light',
            className: [
                'bg-transparent hover:bg-xq-gray-3',
                '[&_p]:text-xq-blue-4 [&_p]:hover:text-xq-blue-6',
                '[&_path]:fill-xq-blue-4 [&_path]:hover:text-xq-blue-6',
            ],
        },
        {
            intent: 'subtle',
            theme: 'light',
            status: 'hover',
            className: 'bg-xq-gray-3 [&_p]:text-xq-blue-6 [&_path]:fill-xq-blue-6',
        },
        {
            intent: 'subtle',
            theme: 'light',
            status: 'disabled',
            className: 'opacity-50',
        },
        /**
         * subtle dark
         */
        {
            intent: 'subtle',
            theme: 'dark',
            className: [
                'bg-transparent hover:bg-xq-gray-3',
                '[&_p]:text-xq-yellow-4 [&_p]:hover:text-xq-yellow-6',
                '[&_path]:fill-xq-yellow-4 [&_path]:hover:fill-xq-yellow-6',
            ],
        },
        {
            intent: 'subtle',
            theme: 'dark',
            status: 'hover',
            className: 'bg-xq-gray-3 [&_p]:text-xq-yellow-6 [&_path]:fill-xq-yellow-6',
        },
        {
            intent: 'subtle',
            theme: 'dark',
            status: 'disabled',
            className: 'opacity-50',
        },
        /**
         * cart light
         */
        {
            intent: 'cart',
            theme: 'light',
            className: [
                'bg-gradient-to-b from-xq-yellow-3 to-xq-yellow-5', // --liner-white-y-01
                'bg-gradient-to-b hover:from-xq-yellow-4 hover:to-xq-yellow-5', // --liner-white-y-02
                'active:from-xq-yellow-4 active:to-xq-yellow-5', // --liner-white-y-02
                '[&_p]:text-xq-gray-7 [&_p]:hover:text-xq-gray-9',
                '[&_path]:fill-xq-gray-7 [&_path]:hover:fill-xq-gray-9',
            ],
        },
        {
            intent: 'cart',
            theme: 'light',
            status: 'hover',
            className: [
                'bg-gradient-to-b from-xq-yellow-4 to-xq-yellow-5', // --liner-white-y-02
                '[&_p]:text-xq-gray-9 [&_path]:fill-xq-gray-9',
            ],
        },
        {
            intent: 'cart',
            theme: 'light',
            status: 'disabled',
            className: 'opacity-25',
        },
        /**
         * cart dark
         */
        {
            intent: 'cart',
            theme: 'dark',
            className: [
                'bg-gradient-to-b from-xq-blue-5 to-xq-blue-3', // --liner-black-b-01
                'hover:from-xq-blue-4 hover:to-xq-blue-3', // --liner-black-b-02
                'active:from-xq-blue-4 active:to-xq-blue-3', // --liner-black-b-02
                '[&_p]:text-xq-gray-9 [&_p]:hover:text-xq-gray-10',
                '[&_path]:fill-xq-gray-9 [&_path]:hover:fill-xq-gray-10',
            ],
        },
        {
            intent: 'cart',
            theme: 'dark',
            status: 'hover',
            className: [
                'bg-gradient-to-b from-xq-blue-4 to-xq-blue-3', // --liner-black-b-02
                '[&_p]:text-xq-gray-10 [&_path]:fill-xq-gray-10',
            ],
        },
        {
            intent: 'cart',
            theme: 'dark',
            status: 'disabled',
            className: 'opacity-25',
        },
        /**
         * alert light
         */
        {
            intent: 'alert',
            theme: 'light',
            className: ['bg-xq-red-3 hover:bg-xq-red-5', '[&_p]:text-xq-gray-1', '[&_path]:fill-xq-gray-1'],
        },
        {
            intent: 'alert',
            theme: 'light',
            status: 'hover',
            className: 'bg-xq-red-5',
        },
        {
            intent: 'alert',
            theme: 'light',
            status: 'disabled',
            className: 'opacity-25',
        },
        /**
         * alert dark
         */
        {
            intent: 'alert',
            theme: 'dark',
            className: [
                'bg-xq-red-3 hover:bg-xq-red-5',
                '[&_p]:text-xq-gray-9 [&_p]:hover:text-xq-gray-10',
                '[&_path]:fill-xq-gray-9 [&_path]:hover:fill-xq-gray-10',
            ],
        },
        {
            intent: 'alert',
            theme: 'dark',
            status: 'hover',
            className: 'bg-xq-red-5 [&_p]:text-xq-gray-10 [&_path]:fill-xq-gray-10',
        },
        {
            intent: 'alert',
            theme: 'dark',
            status: 'disabled',
            className: 'opacity-25',
        },
    ],
    defaultVariants: {
        intent: 'primary',
        status: 'normal',
        theme: 'light',
        size: 'md',
    },
});

export type Props_Button = StyledHTMLAttributes<typeof stylesButton, ButtonHTMLAttributes<HTMLButtonElement>> & {
    text?: string;
    defaultIcon?: boolean;
};
export const Button: FC<Props_Button> = memo((props) => {
    const { intent, status, theme, size, text, className = '', defaultIcon = false, children, ...newProps } = props;
    const styles = stylesButton({ intent, status, theme, size });
    return (
        <button className={cn(styles, className)} {...newProps}>
            {text && <p className="break-keep">{text}</p>}
            {defaultIcon && <TbChevronDown className="[&_path]:fill-transparent" />}
            {children &&
                React.Children.map(children, (child) => {
                    if (typeof child === 'string') {
                        return <p className="break-keep">{child}</p>;
                    }
                    if (isValidElement(child) && child.type === 'p') {
                        return <p className="break-keep">{child}</p>;
                    }
                    return child;
                })}
        </button>
    );
});

const ButtonDefaultIcon: FC<{ intent: Props_Button['intent'] }> = memo(({ intent }) => {
    if (!intent) return null;

    switch (intent) {
        case 'primary':
            return <OutlineChevronDownLarge />;
        case 'secondary':
            return <OutlineChevronDownLarge />;
        case 'outline':
            return <OutlineChevronDownLarge />;
        case 'subtle':
            return <OutlineChevronDownLarge />;
        case 'cart':
            return <OutlineCart />;
        case 'alert':
            return <OutlineAlert />;
        default:
            return null;
    }
});
