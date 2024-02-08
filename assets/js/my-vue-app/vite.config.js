import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'

const libName = 'EpicParticipantUpdater'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve('./', 'src/lib.js'),
      name: libName,
      formats: ['es', 'umd'],
      fileName(format, entryAlias) {
        // add the 'js' extension for compatibility with any webserver:
        // "Strict MIME type checking is enforced for module scripts per HTML spec"
        return `${entryAlias}.${format}.js`
      },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          // moment: 'moment',
        },
      },
      plugins: [
        externalGlobals({
          bootstrap: 'bootstrap',
          '@popperjs/core': 'Popper',
        }),
      ],
    },
  },
  define: {
    'process.env': {},
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  server: {
    watch: {
      usePolling: false,
    },
    // https: true,
    proxy: {
      '/redcap': {
        target: 'http://redcap.test/',
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace('^/redcap', ''),
      },
      '/api': {
        target: 'http://redcap.test/API_PROXY/index.php',
        changeOrigin: true,
        ws: false,
        rewrite: (path) => path.replace('^/api', ''),
      },
    },
  },
})
