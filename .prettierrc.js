module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.mdx',
      options: {
        parser: '@mdx-js/react',
      },
    },
  ],
};
