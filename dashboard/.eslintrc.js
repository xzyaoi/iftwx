module.exports = {
    extends: [
        'eslint-config-alloy/typescript',
    ],
    globals: {},
    rules: {
        "semi": [0, "always"],
        "indent": [2, 2, {
            "SwitchCase": 1
        }],
        "no-unused-vars": 2,
        "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [] }]
    },
}