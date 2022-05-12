module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "sonarjs",
    "simple-import-sort",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "prettier/prettier": [
      "warn",
      {
        semi: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        singleQuote: false,
        trailingComma: "all",
        bracketSpacing: true,
        endOfLine: "auto",
      },
    ],
    "react/prop-types": ["off"],
    "sonarjs/cognitive-complexity": ["error", 5],
    "max-lines-per-function": ["error", 40],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [["^\\u0000"], ["^@?\\w"], ["^"], ["^\\."]],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
};
