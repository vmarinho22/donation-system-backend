export default {
  collectCoverageFrom: ['src/**', '!src/index.ts', '!src/types/**', '!src/controllers/**', '!src/db/**', '!src/routes/**'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['dotenv/config', '<rootDir>/tests/config/env.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};