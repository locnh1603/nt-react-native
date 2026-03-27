module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'App.tsx',
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/index.tsx',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
    // Infrastructure and platform plumbing
    '!src/services/storage/**',
    '!src/services/data/**',
    '!src/services/api-service.ts',
    '!src/services/user-session.ts',
    '!src/app/store.ts',
    '!src/app/rootReducer.ts',
    '!src/app/hooks.ts',
    '!src/models/**',
    '!src/types/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|@reduxjs|immer|react-redux)/)',
  ],
};
