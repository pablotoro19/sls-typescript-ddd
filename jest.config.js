const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');

module.exports = {
  roots: ['src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  verbose: true,
  preset: 'ts-jest',
};
