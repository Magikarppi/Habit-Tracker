module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    // ...
  ],
  parserOptions: {
    // ...
  },
  plugins: ['react', 'jest', 'cypress'],
  rules: {
    // ...
  },
};
