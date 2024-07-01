module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        semi: true,
        singleQuote: true,
        jsxSingleQuote: false,
        bracketSpacing: true,
        trailingComma: "all",
        printWidth: 80,
        tabWidth: 2,
        arrowParens: "avoid",
        endOfLine: "lf",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
