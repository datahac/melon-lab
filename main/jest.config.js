module.exports = {
  "verbose": true,
  "testEnvironment": "node",
  "transform": {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "^.+\\.(jsx?|tsx?)$": "ts-jest"
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
      "tsConfig": "<rootDir>/tsconfig.test.json",
      "diagnostics": false
    }
  }
};
