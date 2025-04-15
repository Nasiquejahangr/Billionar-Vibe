import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react', '@vercel/speed-insights'],
  },
  build: {
    rollupOptions: {
      external: ['@vercel/speed-insights/next']
    }
  }
});

