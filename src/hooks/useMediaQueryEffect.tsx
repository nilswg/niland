import { useCallback, useEffect } from 'react';

/**
 * 透過 media query 監聽螢幕寬度變化
 *
 * @example
 *
 * ```tsx
 *
 *   const [isMobile, setIsMobile] = useState(false);
 *
 *   useMediaQueryEffect(
 *       '(max-width: 600px)', // 當螢幕寬度小於 600px 時為手機版
 *       useCallback((e) => {
 *           // console.log('isMobile', e.matches);
 *           setIsMobile(e.matches);
 *       }, []),
 *   );
 * ```
 *
 */
export const useMediaQueryEffect = (mediaQueryStr: string, callBackOnMatches: (e: MediaQueryListEvent) => void) => {
    const setMobileCallback = useCallback(
        (e: MediaQueryListEvent) => {
            // console.log('isMobile', e.matches);
            callBackOnMatches(e);
        },
        [callBackOnMatches],
    );

    useEffect(() => {
        // 監聽螢幕寬度變化
        var x = window.matchMedia(mediaQueryStr); // 600px 以下為手機版
        x.addEventListener('change', setMobileCallback);

        // 先使用一次螢幕寬度判斷，避免一開始就是手機版
        x.dispatchEvent(new MediaQueryListEvent('change', { matches: x.matches }));
        return () => {
            x.removeEventListener('change', setMobileCallback);
        };
    }, [mediaQueryStr, setMobileCallback]);
};
