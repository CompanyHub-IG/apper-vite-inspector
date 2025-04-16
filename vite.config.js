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
      entry: 'src/index.js',
      name: 'ApperViteInspector',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ['@babel/parser', 'estree-walker', 'magic-string'],
      output: {
        // Provide global variables to use in the UMD build
        globals: {
          '@babel/parser': 'BabelParser',
          'estree-walker': 'EstreeWalker',
          'magic-string': 'MagicString'
        }
      }
    },
    target: 'esnext',
    minify: 'terser',
    sourcemap: true
  },
  resolve: {
    alias: {
      path: 'path-browserify'
    }
  }
});