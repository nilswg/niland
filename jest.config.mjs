export default {
    testMatch: ['**/__tests__/esm/*.test.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/__tests__/$1',
    },
    extensionsToTreatAsEsm: [".ts"],
    transform: {
        "^.+\\.(mt|t|cj|j)s$": "@swc/jest"
    },
};