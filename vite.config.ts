import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // This ensures that the browser routes all requests to index.html
    // so client-side routing works properly
    historyApiFallback: true,
  },
});
