import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default {
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173
  }
};
