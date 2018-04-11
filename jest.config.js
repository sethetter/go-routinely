const path = require('path')

module.exports = {
  transform: {
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node',
    'tsx',
    'jsx'
  ],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.jest.json',
      skipBabel: true
    }
  }
}