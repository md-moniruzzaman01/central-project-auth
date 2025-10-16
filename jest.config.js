/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.jest.json' }],
  },
  moduleNameMapper: {
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  resolver: 'jest-ts-webcompat-resolver',
};
