import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  moduleFileExtensions: ["ts", "tsx", "js"],

  testMatch: ["**/__tests__/**/*.test.(ts|tsx)"],
};

export default config;