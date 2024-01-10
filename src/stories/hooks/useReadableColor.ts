import type { StoryContext } from '@storybook/react';
import { readableColor, toHex } from 'color2k';
import React from 'react';

/**
 * useReadableColor
 *
 * @returns {[ref, hex, textColor]}
 *  ref: 綁在你的背景元件上，會自動計算出該元素的背景色，並且計算出適合的文字顏色
 *  hex: 背景色的 hex 值
 *  textColor: 適合的文字顏色
 *
 * @example
 * ```tsx
 * const Comp = () => {
 *      const [bgColor, setBgColor] = React.useState('black');
 *
 *      const [ref, hex, textColor] = useReadableColor(someColor);
 *
 *      return (
 *          <div ref={ref} style={{ backgroundColor: bgColor }}>
 *              <h1 style={{ color: textColor }}>Hello World</h1>
 *          </div>
 *      )
 * }
 * ```
 */
export const useReadableColor = (...inputDepsColors: any[]): [React.MutableRefObject<HTMLDivElement | null>, string, string] => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const [hex, setHex] = React.useState<string>('');
    const readableTextColor = hex ? readableColor(hex) : 'currentColor';

    /**
     * 當輸入的顏色改變時，重新計算背景色
     */
    React.useEffect(() => {
        if (ref.current === null) {
            return;
        }
        const style = getComputedStyle(ref.current);
        const rgb = style.getPropertyValue('background-color');
        setHex(toHex(rgb));
    }, inputDepsColors);

    return [ref, readableTextColor, hex];
};

export const useStoryBookReadableColor = (ctx: StoryContext) => {
    const { value } = useStoryBookBackgrounds(ctx);
    /**
     * value = '!hex(000)'
     * output = '#000'
     */
    const bgColor = value.startsWith('!hex(') ? value.replace('!hex(', '#').replace(')', '') : value;
    // console.log({ bgColor });
    const readableTextColor = bgColor ? readableColor(bgColor) : 'currentColor';
    // console.log({ readableTextColor });
    return readableTextColor;
};

export const useStoryBookBackgrounds = (ctx: StoryContext) => {
    return ctx?.globals?.backgrounds ?? { value: '#fff' };
};