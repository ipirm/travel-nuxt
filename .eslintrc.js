module.exports = {
  root: false,
  env: {
    browser: false,
    node: false
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/html-self-closing': 'off',
    'no-console': "off",
    'no-return-assign': "off",
    'no-irregular-whitespace': "off",
    "vue/no-unused-components": "off"
  }
}
