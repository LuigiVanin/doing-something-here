module.exports = {
    root: true,
    env: {
        node: true,
        es2022: true,
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "@vue/typescript/recommended",
        "@vue/prettier",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: "@typescript-eslint/parser",
    },
    rules: {
        "vue/no-v-html": "off",
        "vue/require-default-prop": "off",
        "vue/require-explicit-emits": "off",
        "vue/multi-word-component-names": "off",
        "@typescript-eslint/no-explicit-any": "off", // any
        "no-debugger": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off", // setup()
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "max-len": [
            "warn",
            { code: 1000, ignorePattern: 'd\\s*=\\s*"(.|\\n)*?"' },
        ],
        "vue/html-self-closing": [
            "error",

            {
                html: {
                    void: "always",
                    normal: "always",
                    component: "always",
                },
                svg: "always",
                math: "always",
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            },
        ],
        "no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            },
        ],
        "prettier/prettier": [
            "warn",
            {
                usePrettierrc: true,
            },
        ],
    },
};
