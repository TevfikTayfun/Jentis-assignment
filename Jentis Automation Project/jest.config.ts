import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: [
        'js',
        'json',
        'ts',
    ],
    testMatch: [
      '**/*.test.ts',
    ],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: [
        'src/modules/**/**/*.ts',
        'src/core/**/**/*.ts',
        'src/common/**/*.ts',
        '!src/modules/**/**/dto/**/*.ts',
        '!src/modules/**/**/*.module.ts',
    ],
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    testResultsProcessor: 'jest-sonar-reporter',
    verbose: true,
    globalSetup: './global.setup.ts',
    testTimeout: 999999,
    //setupFiles: ['<rootDir>/test/env.ts',],
};

export default config;
