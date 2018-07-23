const base = require("../../jest.config.base.js");

module.exports = {
    ...base,
    name: "@kompose/core",
    displayName: "@kompose/core",
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}"
    ]
};
