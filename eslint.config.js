import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import tseslint from '@typescript-eslint/eslint-plugin'
import * as parserTypeScript from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  configPrettier,
  {
    files: ['**/*.{js,mjs,cjs,vue,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        $slidev: 'readonly',
        $nav: 'readonly',
        $clicks: 'readonly',
        $page: 'readonly',
        $frontmatter: 'readonly',
        $renderContext: 'readonly',
        $clicksContext: 'readonly'
      }
    },
    plugins: {
      prettier: pluginPrettier,
      '@typescript-eslint': tseslint
    },
    env: {
      browser: true,
      node: true,
      es2021: true
    },
    rules: {
      'prettier/prettier': 'warn',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  {
    ignores: ['node_modules', 'dist', '.slidev', '*.md']
  }
]
