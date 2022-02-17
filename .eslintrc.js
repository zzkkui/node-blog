module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        '@typescript-eslint/ban-types': 'off',
        "prettier/prettier": ["error", {
            "endOfLine":"auto"
        }]
    }
};
