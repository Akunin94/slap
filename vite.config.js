import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const noAttr = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      return html
        .replace(`rel="stylesheet" crossorigin`, `rel="stylesheet"`)
        .replace(`type="module" crossorigin src="/`, `type="module" crossorigin src="`)
        .replace(`link rel="stylesheet" href="/`, `link rel="stylesheet" href="`);
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // Отключаем все дополнительные оптимизации
    minify: false,
    cssCodeSplit: false,
    sourcemap: false,
    writeBundle: {
      // Отключаем запись манифеста и других вспомогательных файлов
      manifest: false,
      emitFiles: true
    },
    assetsDir: '.',
    output: {
      format: 'umd', // Change this to 'iife' or 'umd'
    },
  },
  plugins: [vue(), noAttr()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
