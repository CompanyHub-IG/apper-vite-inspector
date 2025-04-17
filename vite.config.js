import { defineConfig } from 'vite';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['path']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ApperViteInspector',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ['@babel/parser', 'estree-walker', 'magic-string', 'vite'],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          '@babel/parser': 'BabelParser',
          'estree-walker': 'EstreeWalker',
          'magic-string': 'MagicString',
          'vite': 'Vite'
        }
      }
    },
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    cssCodeSplit: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    assetsInlineLimit: 4096
  },
  resolve: {
    alias: {
      path: 'path-browserify'
    }
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['@babel/parser', 'estree-walker', 'magic-string']
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  commonjsOptions: {
    include: [/node_modules/],
    extensions: ['.js', '.cjs']
  }
});