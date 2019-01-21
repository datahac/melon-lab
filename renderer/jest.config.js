module.exports = {
  "verbose": true,
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "^+/components/(.*)$": "<rootDir>/components/$1",
    "^~/queries/(.*)$": "<rootDir>/../queries/$1",
    "^~/blocks/(.*)$": "<rootDir>/storybook/blocks/$1",
    "^~/components/(.*)$": "<rootDir>/storybook/components/$1",
    "^~/design/(.*)$": "<rootDir>/storybook/design/$1",
    "^~/templates/(.*)$": "<rootDir>/storybook/templates/$1",
    "^~/shared/(.*)$": "<rootDir>/shared/$1",
    "^~/link$": "<rootDir>/storybook/link",
    "^~/introspection$": "<rootDir>/introspection.json"
  },
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFiles": [require.resolve("./jest.setup")],
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
