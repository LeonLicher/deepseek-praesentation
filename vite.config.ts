import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

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
