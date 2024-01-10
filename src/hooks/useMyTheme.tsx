import { useMemo, useState } from 'react';
import { useMounted } from './useMounted';

const defaultTheme = 'light';

/**
 * 這裡供自行定義 theme 的 hook，因為 next-themes 的 useTheme hook 有點麻煩。
 * @returns
 */
export const useMyTheme = () => {
    const [theme, setTheme] = useState<'system' | 'dark' | 'light' | undefined>(defaultTheme);
    return useMemo(
        () => ({
            theme: theme,
            getMyTheme: () => {
                console.log('getMyTheme', theme);
                // TODO 接讀取 XQ 的 localStorage
                return theme === 'system' ? getSystemTheme() : theme ?? defaultTheme;
            },
            setMyTheme: (newTheme: 'dark' | 'light') => {
                setTheme(newTheme);
                console.log('setTheme', newTheme);

                //
                updateGlobalTheme(newTheme);
            },
        }),
        [theme],
    );
};

/**
 * 在 html 中加上 data-theme 屬性，並且在 body 加上 class="dark"，這樣就可以使用 tailwindcss 的 dark mode 了。
 */
const updateGlobalTheme = (theme: 'dark' | 'light') => {
    const html = document.querySelector('html');
    if (!html) {
        console.error('更新 global theme 失敗，只能使用於 client side');
        return;
    }
    html.setAttribute('data-theme', theme);
};

export const useMyThemeOnMounted = (themeUnMounted: 'dark' | 'light') => {
    const mounted = useMounted();
    const { getMyTheme, setMyTheme } = useMyTheme();
    const myTheme = useMemo(() => (!mounted ? themeUnMounted : getMyTheme()), [mounted, getMyTheme]);

    return { mounted, myTheme, setMyTheme };
};

const getSystemTheme = (): 'dark' | 'light' => {
    const res = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return !!res ? 'dark' : 'light';
};
