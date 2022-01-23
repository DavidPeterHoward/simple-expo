const { withEnzyme } = require("jest-expo-enzyme");

module.exports = {
    projects: [
        // Skipping Node because we want to test DOM presets only
        withEnzyme(require("jest-expo/ios/jest-preset")),
        withEnzyme(require("jest-expo/android/jest-preset")),
        // The Enzyme support added to web is different from that added to native, which `withEnzyme` handles
        // Luckily you won't have to do anything special because it reads the platform from
        // `haste.defaultPlatform` of the provided Jest config
        withEnzyme(require("jest-expo/web/jest-preset")),
    ],
    roots: ["<rootDir>"],
    setupFiles: ["./setupTests.js"],
    moduleFileExtensions: ["js", "ts", "tsx", "json"],
    testPathIgnorePatterns: ["./node_modules/"],
    moduleNameMapper: {
        "^@components(.*)$": "<rootDir>/src/components$1",
        "^@constants(.*)$": "<rootDir>/src/constants$1",
    },
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
        "^.+\\.tsx?$": "ts-jest",
    },
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.jest.json",
        },
    },
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,jsx}",
        "**/*.{ts,tsx}",
        "!**/coverage/**",
        "!**/node_modules/**",
        "!**/babel.config.js",
        "!**/jest.setup.js",
        "!./index.js",
        "!./App.ts",
    ],
};