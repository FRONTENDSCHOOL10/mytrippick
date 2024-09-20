import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const viteConfig = defineConfig({
  base: '/',
  server: {
    host: 'localhost',
    port: 3000,
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-router-dom': ['react-router-dom'],
          'react-ecosystem': [
            'immer',
            'use-immer',
            '@tanstack/react-query',
            'react-helmet-async',
            'react-datepicker',
            'react-spinners',
            'zustand',
            'swiper',
            'axios',
            'clsx',
          ],
          components: [
            './src/components/ToggleBtn/ToggleBtn.jsx',
            './src/components/Card/Card.jsx',
          ],
        },
      },
    },
  },
});

export default viteConfig;
