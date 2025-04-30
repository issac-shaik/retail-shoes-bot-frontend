import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  resolve: {
    // make sure Vite prefers the browser/ESM entrypoints
    mainFields: ['browser', 'module', 'main']
  },
  optimizeDeps: {
    include: [
      '@aws-sdk/client-bedrock-agent-runtime',
      '@aws-sdk/credential-provider-cognito-identity'
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
})
