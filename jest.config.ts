import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx|js|jsx)",
    "<rootDir>/src/**/*.(test|spec|tests).(ts|tsx|js|jsx)",
  ],
  collectCoverageFrom: ["src/**/*.(ts|tsx)", "!src/**/*.d.ts"],
};

export default config;
