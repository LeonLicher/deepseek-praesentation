import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'components'),
      '@public': resolve(__dirname, 'public'),
      '@composables': resolve(__dirname, 'composables'),
      '@layouts': resolve(__dirname, 'layouts')
    }
  }
})
