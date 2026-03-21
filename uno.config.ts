import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      'fh-blue': '#0066b3',
      'fh-dark-blue': '#003978',
      'fh-orange': '#f79646',
      'fh-gray': '#6b7280',

      primary: {
        DEFAULT: '#0066b3',
        dark: '#003978',
        light: '#4d94d1'
      },
      secondary: {
        DEFAULT: '#f79646'
      }
    }
  }
})
