module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    testMatch: ["**/*.test.ts?(x)"],
    transform: {
        "^.+\\.[tj]sx?$": [
            "@swc/jest",
            {
                jsc: { parser: { syntax: "typescript", tsx: true }, transform: { react: { runtime: "automatic" } } },
                module: { type: "commonjs" },
            },
        ],
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@/components/ui/dialog$": "<rootDir>/src/test/mocks/dialogMock.js",
        "\\.(css|scss|sass|less)$": "identity-obj-proxy",
    },
};
