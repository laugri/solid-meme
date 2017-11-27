module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['flowtype'],
  parser: 'babel-eslint',
};
