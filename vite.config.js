import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      base: '/goit-js-hw-10/',  
      rollupOptions: {
        input: {
          main: glob.sync('./src/index.html')[0],
          timer: glob.sync('./src/1-timer.html')[0],
          snackbar: glob.sync('./src/2-snackbar.html')[0]
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'js/[name].js',
        },
      },
      outDir: '../dist',
      emptyOutDir: true, 
    },
    plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
  };
});
