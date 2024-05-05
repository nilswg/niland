/**
 * ## args
 */
const _args = (function () {
  const args = process.argv.slice(2); // 去除前两个默认参数

  let env = process.env.NODE_ENV || 'development';

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-e': // env
        if (i + 1 < args.length) {
          env = args[i + 1];
        }
        break;
      default:
        break;
    }
  }

  if (!env) {
    console.warn('[Warning] 因為無輸入 -e 參數，使用預設的環境變數');
  }

  return {
    env,
    IsDev: env === 'development',
  };
})();

export const $args = () => _args;
// console.log(args);
