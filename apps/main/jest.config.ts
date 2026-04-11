const nextJest = require('next/jest.js').default ?? require('next/jest.js');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  displayName: '@katie-portofolio/main',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/main',
  testEnvironment: 'jsdom',
  passWithNoTests: true,
};

module.exports = createJestConfig(config);
