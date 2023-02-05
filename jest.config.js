import { pathToModuleNameMapper } from 'ts-jest/utils'
import compilerOptions from './tsconfig.json'

module.exports = {
  clearMocks: true,
  moduleNameMapper: pathToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html', 'text'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/middlewares',
  ],
  preset: 'ts-jest',
  testEnvironment: 'none',
  modulePathIgnorePatterns: ['dist', 'node_modules', 'coverage'],
  testMatch: ['**/?(*.)+(spec|test).(js|ts|tsx)'],
}
