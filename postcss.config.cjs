//@ts-check

/**
 * vite 對 postcss 是內建支援的。
 * 因此想要能 compile tailwind.css 檔案，
 * 僅需要在專案根目錄建立 postcss.config.js 檔案就可以作用
 * 
 * Storybook(Vite) 和 Astro(Vite) 都能吃到這邊的設定。
 */

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}
