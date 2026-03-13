const js = require("@eslint/js")
const stylistic = require("@stylistic/eslint-plugin-js")
const globals = require("globals")

module.exports = [
  {
    ignores: ["node_modules/**", "generated/**", ".env"]
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/semi": ["error", "never"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/indent": ["error", 2]
    }
  }
]
