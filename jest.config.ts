module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/presentation/router/**/*',
    '!<rootDir>/src/presentation/factories/**/*',
    '!<rootDir>/src/App.tsx',
    '!<rootDir>/src/main.tsx',
    '!<rootDir>/src/domain/models/index.ts',
    '!<rootDir>/src/domain/useCases/index.ts',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
};
