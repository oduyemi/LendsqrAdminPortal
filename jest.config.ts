export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx)"],
  
    transform: {
      "^.+\\.(ts|tsx)$": [
        "ts-jest",
        {
          tsconfig: "tsconfig.test.json",
        },
      ],
    },
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy",
      "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.ts",
    },
    
  };