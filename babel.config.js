module.exports = api => {
    api.cache(false)
    return {
        "presets": [
            "@babel/env",
            "@babel/typescript"
        ],
        "plugins": [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread"
        ]
    }
}
