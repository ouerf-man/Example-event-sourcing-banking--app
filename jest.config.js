module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Specify the paths to your tests
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // Mock modules if necessary
  moduleNameMapper: {
    '^@prisma/client$': '<rootDir>/src/server/infrastructure/__mocks__/prismaClient.ts',
  },
};