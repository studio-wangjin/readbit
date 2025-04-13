const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Next.js 앱의 경로를 지정
  dir: './',
});

// Jest 커스텀 설정
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // 절대 경로 별칭 설정
    '^@/src/(.*)$': '<rootDir>/src/$1',
  },
  // 테스트 대상 파일 패턴
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
};

// createJestConfig를 내보내 Next.js에서 사용할 수 있도록 함
module.exports = createJestConfig(customJestConfig);
