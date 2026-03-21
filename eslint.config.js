import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import * as parserTypeScript from '@typescript-eslint/parser'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'

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
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        URL: 'readonly',
        process: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
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
