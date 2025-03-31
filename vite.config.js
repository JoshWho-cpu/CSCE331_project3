import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: ["csce331-project3-1.onrender.com"], // Add your Render host here
    port: process.env.PORT || 5173, // Ensure it respects the assigned port
    host: true, // Allow external access
  }
})