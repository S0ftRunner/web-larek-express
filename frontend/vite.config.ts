import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
<<<<<<< HEAD
=======
import svgr from "vite-plugin-svgr";
>>>>>>> admin
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tsconfigPaths({root: __dirname})],
=======
  plugins: [ svgr(), react(), tsconfigPaths({root: __dirname})],
>>>>>>> admin
  resolve: {
    alias: {
      $fonts: resolve('./src/vendor/fonts'),
      $assets: resolve('./src/assets'),
    }
  },
  build: {
    assetsInlineLimit:0,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "./src/scss/variables" as *;
          @use "./src/scss/mixins";
        `,
      },

    }
  },

})
