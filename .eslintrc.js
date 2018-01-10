module.exports = {
    "extends": "standard",
    "env": {
        "node": true,
        "es6": true,
        "mocha": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 7,
        "sourceType": "module",
        "ecmaFeatures": {
            "arrowFunctions": true
        }
    },
    "rules": {
        "func-style": [2, "declaration", { "allowArrowFunctions": true }],
        "semi": 2
    }
};