module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
    },
    rootDir: ".",
    moduleFileExtensions: ["js", "json", "ts"],
    moduleDirectories: ["node_modules", "src"],
    collectCoverageFrom: ['src/**/*.ts'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
}
