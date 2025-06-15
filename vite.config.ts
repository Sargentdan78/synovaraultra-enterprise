import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables based on mode
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Ensure no development-only features are included in production
    build: {
      sourcemap: mode === 'development',
      rollupOptions: {
        // Exclude development-only scripts
        external: mode === 'production' ? [
          'https://static.devv.ai/devv-app.js'
        ] : []
      }
    },
    // Ensure the server doesn't attempt to connect to development services in production
    server: {
      // Force defined port usage to avoid conflicts
      port: parseInt(env.PORT || '3000'),
      // Prevent proxy attempts to development-only services
      proxy: {}
    }
  }
})