import React from "react";

/**
 * 假如使用 ref 觀察的元件會變動時，必須指定 deps 來同步更新 className 資訊。
 */
export const useRefClassName = <T extends HTMLElement = HTMLDivElement>(queryStr: string = 'button', deps: ReadonlyArray<any> = []) => {
    const ref = React.useRef<T | null>(null);
    const [className, setClassName] = React.useState<string>('');
    React.useEffect(() => {
        if (ref?.current) {
            const className = ref.current.querySelector(queryStr)?.className || '';
            setClassName(className);
        }
    }, [ref, ...deps]);
    return { ref, className };
};