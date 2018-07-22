const base = require("./jest.config.base.js");

module.exports = {
    ...base,
    projects:
    [
        "<rootDir>/packages/*"
    ],
    moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
    testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
    coverageDirectory: "<rootDir>/coverage/"
};
