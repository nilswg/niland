import React from 'react';

/**
 * 假如使用 ref 觀察的元件會變動時，必須指定 deps 來同步更新 className 資訊。
 */
export const useResizeObserver = <T extends HTMLElement>(callback?: (entry: ResizeObserverEntry) => void) => {
    const ref = React.useRef<T | null>(null);
    // const [width, setWidth] = React.useState(0);

    /**
     * 當 Tailwind CSS 的類別名稱改變時，會更新 p 的樣式表，
     * 這裡再從元素的樣式表中取得對應的 CSS 屬性值。
     */
    React.useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // const { width } = entry.contentRect;
                // setWidth(width);
                if (callback) {
                    callback(entry);
                }
            }
            // console.log('Size changed');
        });
        if (!!ref.current && !!resizeObserver) {
            resizeObserver.observe(ref.current!);
        }
        return () => {
            if (!!ref.current) {
                resizeObserver.unobserve(ref.current);
                resizeObserver.disconnect();
            }
        };
    }, []);

    return { ref };
};

export const useResizableWidth = <T extends HTMLElement>() => {
    const [width, setWidth] = React.useState(0);
    const setWidthCallBack = React.useCallback((entry: ResizeObserverEntry) => {
        setWidth(entry.contentRect.width);
    }, []);
    const { ref } = useResizeObserver<T>(setWidthCallBack);
    // 設置初始寬度
    React.useEffect(() => {
        if (ref?.current) {
            setWidth(ref.current.clientWidth);
        }
    }, [ref]);
    return { ref, width, setWidth };
};