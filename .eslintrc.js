module.exports = {
    env: {
        'browser': true,
        'node': true,
        'shared-node-browser': true,
        'worker': true,
    },
    extends: [
        // https://eslint.org/docs/latest/user-guide/configuring/configuration-files#extending-configuration-files
        'eslint:all',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        // https://eslint.vuejs.org/user-guide
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    /*
     * https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
     * https://typescript-eslint.io/docs/linting/troubleshooting#i-am-running-into-errors-when-parsing-typescript-in-my-vue-files
     */
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        extraFileExtensions: ['.json', '.vue'],
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.eslint.json'],
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    plugins: [
        // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
        'vue',
        '@typescript-eslint',
    ],
    root: true,
    rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
    },
};
