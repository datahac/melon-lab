module.exports = {
  "verbose": true,
  "testURL": "http://localhost/",
  "roots": ["<rootDir>/src", "<rootDir>/tests"],
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "^.+\\.s?css$": "identity-obj-proxy",
    "^~/design/(.*)$": "./src/storybook/design/$1",
    "^~/blocks/(.*)$": "./src/storybook/blocks/$1",
    "^~/components/(.*)$": "./src/storybook/components/$1",
    "^~/containers/(.*)$": "./src/storybook/containers/$1",
    "^~/utils/(.*)$": "./src/storybook/utils/$1"
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
      "tsConfigFile": "tsconfig.json",
      "useBabelrc": true
    }
  }
};
