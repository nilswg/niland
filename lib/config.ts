import { $args } from './args';

type Config = {
    mode: 'DEV' | 'PROD';
    baseUrl: string;
    apiUrl: string;
};

const _config = (function () {
    const args = $args();
    return {
        DEV: {
            ...args,
            baseUrl: '/abc/',
            apiUrl: 'http://localhost:5000/api',
        },
        PROD: {
            ...args,
            baseUrl: '/xyz/',
            apiUrl: 'https://example.com.tw/api',
        },
    }[args.mode] as Config;
})();

export const $config = () => _config;
