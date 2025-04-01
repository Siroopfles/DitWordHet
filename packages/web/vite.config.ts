import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['@ditwordhet/shared']
    }
  },
  optimizeDeps: {
    include: ['@ditwordhet/shared']
  }
});
