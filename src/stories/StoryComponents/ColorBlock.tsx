import React from 'react';
import { cn } from '@/utils/cn';

import { useStoryContext } from './StoryContextProvider';
import { useReadableColor } from '../hooks/useReadableColor';

type Props = {
    children?: React.ReactNode;
    id: string;
};

export const ColorBlock: React.FC<Props> = ({ id, children }) => {
    const { readableTextColor: textColor } = useStoryContext();
    return (
        <div className="inline-flex w-full gap-4">
            <h1 className={cn('flex items-center px-2', textColor)}>{id}</h1>
            <div className={cn('flex flex-row gap-5', textColor)}>{children}</div>
        </div>
    );
};

type Props_ColorDetails = {
    children?: React.ReactNode;
    theme?: 'dark' | 'light';
    token: string;
};
export const ColorDetails: React.FC<Props_ColorDetails> = ({ children, theme, token }) => {
    const { readableTextColor } = useStoryContext();

    return (
        <div className="w-[220px]">
            {theme && <h2 className={readableTextColor}>{theme}</h2>}
            {children}
            {/* <h3 className={cn('break-words text-sm', readableTextColor)}>linear-gradient(297deg, #ffc65f 0%, #ffd88c 100%)</h3> */}
            <h3 className={cn('break-words text-sm', readableTextColor)}>{token}</h3>
        </div>
    );
};

type Props_ColorItem = {
    cssVarColor?: string;
    twColor?: string;
    hexColor?: string;
};

const useColorItemStyles = () => {
    const { readableBorderColor } = useStoryContext();
    return {
        base: (...inputs: string[]) =>
            cn('h-[100px] flex-wrap rounded-lg border-[1px] p-1 md:flex md:justify-between', readableBorderColor, ...inputs),
    };
};

export const ColorItem: React.FC<Props_ColorItem> = ({ cssVarColor, twColor, hexColor }) => {
    const { base } = useColorItemStyles();
    const [ref, textColor, hex] = useReadableColor(cssVarColor, twColor, hexColor);
    return (
        <React.Fragment>
            {cssVarColor && (
                <div className={base()} style={{ backgroundColor: `var(--${cssVarColor})` }} ref={ref}>
                    <p style={{ color: textColor }}>{cssVarColor}</p>
                    <p style={{ color: textColor }}>{hex}</p>
                </div>
            )}
            {twColor && (
                <div className={base(twColor)} ref={ref}>
                    <p style={{ color: textColor }}>{cssVarColor}</p>
                    <p style={{ color: textColor }}>{hex}</p>
                </div>
            )}
            {hexColor && (
                <div className={base()} ref={ref} style={{ backgroundColor: hexColor }}>
                    <p style={{ color: textColor }}>{cssVarColor}</p>
                    <p style={{ color: textColor }}>{hex}</p>
                </div>
            )}
        </React.Fragment>
    );
};
