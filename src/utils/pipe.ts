type Fn<T extends any[], R = T> = (x: T, ...args: any[]) => R;

/**
 * 組合函式
 */
export const pipe = <T extends any[]>(...fns: Fn<T>[]): Fn<T> => {
    return (x, ...args) => fns.reduce((v, f) => f(v, ...args), x);
};
