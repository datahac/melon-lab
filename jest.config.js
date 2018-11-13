module.exports = {
  "verbose": true,
  "testURL": "http://localhost/",
  "roots": ["<rootDir>/src", "<rootDir>/tests"],
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "^.+\\.s?css$": "identity-obj-proxy",
    "^~/design/(.*)$": "<rootDir>/src/storybook/design/$1",
    "^~/blocks/(.*)$": "<rootDir>/src/storybook/blocks/$1",
    "^~/components/(.*)$": "<rootDir>/src/storybook/components/$1",
    "^~/containers/(.*)$": "<rootDir>/src/storybook/containers/$1",
    "^~/utils/(.*)$": "<rootDir>/src/shared/utils/$1",
    "^~/link$": "<rootDir>/src/storybook/link"
  },
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFiles": [
    require.resolve("./jest.setup"),
  ],
  "transform": {
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
      "tsConfig": "tsconfig.test.json",
      "diagnostics": false,
    }
  }
};
