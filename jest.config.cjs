module.exports = {
    testMatch: ['**/__tests__/*.test.ts', '**/__tests__/cjs/*.test.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/__tests__/$1',
    },
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest',
    },
};