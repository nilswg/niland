/**
 * 輸入參數解析
 */
const res = {
    viteEnv: import.meta.env.MODE,
    mode: '',
};

const _args = (function () {
    if (typeof process === 'undefined') {
        return {};
    }
    const args = process.argv.slice(2); // 去除前两个默认参数
    for (let i = 0; i < args.length; i++) {
        switch (args[i]) {
            case '--mode': // mode
                if (i + 1 < args.length) {
                    res.mode = args[i + 1];
                }
                break;
            default:
                break;
        }
    }
    return res;
})();

export const $args = () => _args as typeof res;
// console.log('輸出參數: ', { _args });
