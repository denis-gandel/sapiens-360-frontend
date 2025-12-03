import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@validations": path.resolve(__dirname, "./src/validations"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // UI library
          'ui-vendor': ['reshaped'],
          
          // Utility libraries
          'utils-vendor': ['axios', 'zod', 'typescript-json-serializer'],
          
          // Large libraries
          'xlsx-vendor': ['xlsx'],
          'icons-vendor': ['lucide-react', 'lucide-static'],
        },
      },
    },
    // Increase chunk size warning limit if needed
    chunkSizeWarningLimit: 1000,
  },
});
