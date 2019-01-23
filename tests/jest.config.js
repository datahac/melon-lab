const path = require('path');

module.exports = {
  "verbose": true,
  "testEnvironment": "node",
  "rootDir": path.resolve(__dirname, '..'),
  "roots": ["<rootDir>/tests"],
  "moduleNameMapper": {
    "^~/queries/(.*)$": "<rootDir>/renderer/queries/$1",
    "^~/graphql/(.*)$": "<rootDir>/main/graphql/$1"
  },
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFiles": ["<rootDir>/tests/jest.setup.js"],
  "transform": {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "globals": {
    "ts-jest": {
      "tsConfig": "<rootDir>/tests/tsconfig.json",
      "diagnostics": false
    }
  }
};
