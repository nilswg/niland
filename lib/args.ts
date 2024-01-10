/**
 * 輸入參數解析
 *
 * @example
 * node ./mock-server -p 5000 -s ../your_static_folder
 */
const _args = (function () {
    if (typeof process === 'undefined') {
        return {};
    }
    const args = process.argv.slice(2); // 去除前两个默认参数

    /**
     * 預設的環境變數可由 NODE_ENV 來設定，或是透過 -e 參數來設定
     * 目前此項影響對外開放的 API 數量。
     *
     * 當不希望將所有 end-point 都被建置出來時，可將此項設定為 development
     * 如希望使用所有 end-point，則設定為 production
     */
    let env = process.env.NODE_ENV || 'development';
    let basePath = '';


    /**
     * @example
     * ```
     * --api /api/
     * 
     * base: http://localhost:4321/xqsite-next/
     * output: http://localhost:4321/xqsite-next/api/...
     * 
     * 
     * --api http://localhost:5000/api/
     * output: http://localhost:5000/api/...
     * ```
     *
     * dev: 'http://localhost:5000/api/',
     * storybook: 'http://localhost:5000/api/',
     * build-a: 'https://www.xq.com.tw/wp-json/xqapi/v1/',
     */
    let apiBase = 'http://localhost:5000/api/';


    /**
     * site: https://www.xq.com.tw/'
     */
    let site = '';

    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '-e': // env
                if (i + 1 < args.length) {
                    env = args[i + 1];
                }
                break;
            case '--base': // basePath
                if (i + 1 < args.length) {
                    basePath = args[i + 1];
                }
                break;
            case '--api': // apiBase
                if (i + 1 < args.length) {
                    apiBase = args[i + 1];
                }
            case '--site': // site
                if (i + 1 < args.length) {
                    site = args[i + 1];
                }
                break;
            default:
                break;
        }
    }

    if (!env) {
        console.warn('[Warning] 因為無輸入 -e 參數，使用預設的環境變數');
    }

    console.log(`env: ${env}`);
    console.log(`basePath: ${basePath}`);
    console.log(`apiBase: ${apiBase}`);
    console.log(`site: ${site}`);

    return {
        env,
        basePath,
        apiBase,
        IsDev: env === 'development',
    };
})();

export const $args = () => _args;
// console.log('輸出參數: ', { _args });
