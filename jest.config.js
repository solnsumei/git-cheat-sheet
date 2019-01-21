module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  setupTestFrameworkScriptFile: './client/__tests__/setUpTest.js',
  testPathIgnorePatterns: ['client/__tests__/__mocks__', 'client/__tests__/setUpTest.js'],
  collectCoverageFrom: [
    'client/src/**/*.{js,jsx}',
    '!client/src/index.js',
    '!client/src/store/**',
    '!client/store/**',
    '!client/styles/**'
  ],
  moduleFileExtensions: ['js', 'jsx'],
};
