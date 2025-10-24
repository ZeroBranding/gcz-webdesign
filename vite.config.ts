import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Security Headers für Development
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:;"
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Security & Performance Optimizations
    sourcemap: mode === 'development',
    minify: 'esbuild',
    cssMinify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks für bessere Caching
          vendor: ['react', 'react-dom'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip'
          ],
          forms: [
            'react-hook-form',
            '@hookform/resolvers',
            'zod'
          ],
          animations: [
            'framer-motion',
            'react-resizable-panels'
          ],
          icons: ['lucide-react'],
          utils: [
            'clsx',
            'tailwind-merge',
            'class-variance-authority'
          ],
          charts: ['recharts'],
          query: ['@tanstack/react-query'],
          supabase: ['@supabase/supabase-js']
        },
        // Asset naming für besseres Caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      }
    },
    // Performance optimizations
    target: 'esnext',
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
  // CSS optimization
  css: {
    devSourcemap: mode === 'development',
    modules: {
      localsConvention: 'camelCase'
    }
  },
  // Dependency pre-bundling optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'lucide-react'
    ],
    exclude: ['@vite/client', '@vite/env']
  }
}));
