/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // ESM preset for ts-jest
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    '^@middlewares/(.*)$': '<rootDir>/src/app/middlewares/$1',
    '^@modules/(.*)$': '<rootDir>/src/app/modules/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@types/(.*)$': '<rootDir>/src/interfaces/$1',
  },
  resolver: 'jest-ts-webcompat-resolver', // handles ESM + TS
};
