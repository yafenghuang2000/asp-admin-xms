import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import progress from 'vite-plugin-progress';
import { manualChunks } from './viteConfigBuild';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      progress(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
    server: {
      port: 8000,
      open: true,
      host: '0.0.0.0',
      strictPort: false,
      cors: true,
      strict: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      minify: 'terser',
      chunkSizeWarningLimit: 1024,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            return manualChunks(id);
          },
          chunkFileNames: (chunkInfo) => {
            return chunkInfo.name.includes('vendor')
              ? 'js/vendor/[name].[hash].js'
              : 'js/app/[name].[hash].js';
          },
          entryFileNames: 'js/app/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            // 根据 asset 的类型和路径决定输出子目录
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return assetInfo.name.includes('node_modules')
                ? 'css/vendor/[name].[hash].[ext]'
                : 'css/app/[name].[hash].[ext]';
            }
            return 'assets/[name].[hash].[ext]';
          },
        },
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#1890ff',
          },
        },
        sass: {},
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
      __APP_BASE_API__: JSON.stringify(env.VITE_APP_BASE_API),
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
    },
  };
});
