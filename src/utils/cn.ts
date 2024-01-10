import type { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

/**
 * clsx
 * @see https://github.com/lukeed/clsx/blob/master/src/index.js
 */
// import { clsx, type ClassValue } from "clsx"
// function cn_clsx(...inputs: ClassValue[]) {
//   return twMerge(clsx(...inputs))
// }

/**
 * 以效能來看分析來看，clsx 約是 classNames 的 3.85 倍，classix 約是 clsx 的 2.5 倍。
 * 當寫法不考慮以物件方式來輸入 classNames 時，classix 是最快的。
 *
 * classix
 * @see https://github.com/alexnault/classix/blob/main/src/index.ts
 */
type Argument = string | boolean | null | undefined;

/**
 * Conditionally join classNames into a single string
 * @param {...String} args The expressions to evaluate
 * @returns {String} The joined classNames
 */
function cx(...args: Argument[]): string;
function cx(): string {
    let str = '',
        i = 0,
        arg: unknown;

    for (; i < arguments.length; ) {
        if ((arg = arguments[i++]) && typeof arg === 'string') {
            str && (str += ' ');
            str += arg;
        }
    }
    return str;
}

function cn_classix(...inputs: Argument[]) {
    return twMerge(cx(...inputs));
}

/**
 * cn = classnames 的縮寫，這裡可輸入多個 tailwind classes 的字串陣列，最後會回傳一個合併後的字串。
 */
export const cn = cn_classix;

export type ClassValue<T> = Parameters<typeof cva<T>>['0'];
export type CvaConfig<T> = Parameters<typeof cva<T>>['1'];
export type CvaProps<T> = Parameters<ReturnType<typeof cva<T>>>;
export const createVariants = <T>(base: ClassValue<T>, config?: CvaConfig<T>) => {
    return (...props: CvaProps<T>) => twMerge(cva(base, config)(...props));
};
export type NoNull<T> = {
    [P in keyof T]?: Exclude<T[P], null>;
};

export type NoNullVariant<T extends (...args: any) => any> = NoNull<VariantProps<T>> & { className?: string };
export type StyledHTMLAttributes<CN extends (...args: any) => any, T = React.HTMLAttributes<{ children: ReactNode }>> = T & NoNullVariant<CN>;