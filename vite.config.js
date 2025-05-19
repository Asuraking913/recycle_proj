import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: true,  // Set to true for HTTPS
      }
    }
  }
})
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://israel913.pythonanywhere.com/',
//         changeOrigin: true,
//         secure: true,  // Set to true for HTTPS
//       }
//     }
//   }
// })
