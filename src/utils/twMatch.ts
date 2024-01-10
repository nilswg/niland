/**
 * 透過提供的比對前綴，產生 matchBy 函式
 *
 * @example
 * const $text = matchBy('text-')
 * $text('text-base') // base
 * $text('text-sm') // sm
 * $text('text-[1.5rem]') // 1.5rem
 *
 * const $font = matchBy('font-')
 * $font('font-[48px]]') // 48px
 * $font('font-5xl') // 5xl
 *
 * const $bg = matchBy('bg-')
 * $bg('bg-red-500') // red-500
 * $bg('bg-[#f00]') // #f00
 */
const _m = (re: string | RegExp, input = '', fallback = '', postfix = '') => {
    if (!!input && input !== '') {
        let res = input.match(re)?.[1];
        if (!!res) {
            return res + postfix;
        }
    }
    return fallback;
};

/**
 * 透過提供的比對前綴，產生 matchBy 函式
 */
export const matchBy = (prefix: string, fallback = '', postfix = '') => {
    return (input?: string) => {
        const re = new RegExp(`${prefix}\\[?([\\w-]*)\\]?`, 'i');
        return _m(re, input, fallback, postfix);
    };
};

export const matchNthOfType = (prefix: string, index: number, fallback = '', postfix = '') => {
    return (input?: string) => {
        /**
         * @example
         * tailwind: [&>svg:nth-of-type(1)]:fill-xq-blue-4
         */
        const re = new RegExp(`\\[&>svg\\:nth-of-type\\(${index}\\)]\\:${prefix}\\[?([\\w-]*)\\]?`, 'i');
        return _m(re, input, fallback, postfix);
    };
};

/**
 * var input1 = 'border-xq-red-5';
 * var input2 = '  border-xq-red-5';
 * var input3 = 'a  border-xq-red-5';
 * var input4 = ':border-xq-red-5';
 * var input5 = 'aborder-xq-red-5';
 *
 * prefix = 'border-xq-'
 *
 * 其中， input1,2,3 都會回傳 'red-5'
 * input4,5 都會回傳 ''
 */
export const matchExactly = (prefix: string, fallback = '', postfix = '') => {
    // 有字母時，一定要包含空白。
    // 沒有字母時，可以包含空白，也可以不包含空白。
    // (?<=\s|^): 這是正向後瞻斷言，表示符合的字串前面必須是空格字元（\s）或字串的開頭（^）。
    // 這個部分並不會捕捉到實際的匹配內容，它只是用來限定匹配的位置。
    return (input?: string) => {
        const re = new RegExp(`(?<=\\s|^)${prefix}\\[?([\\w-]*)\\]?`, 'i');
        return _m(re, input, fallback, postfix);
    };
};

/**
 * 透過提供的比對前綴，產生 matchFor 函式
 */
export const matchFor = (prefixes: string[] | string, fallback = '', postfix = '') => {
    return (input?: string) => {
        if (typeof prefixes === 'string') {
            return matchBy(prefixes, fallback, postfix)(input);
        }
        for (const prefix of prefixes) {
            const re = new RegExp(`${prefix}\\[?([\\w-]*)\\]?`, 'i');
            const res = _m(re, input, fallback, postfix);
            if (res !== fallback) return res;
        }
        return fallback;
    };
};