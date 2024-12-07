import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || 'task_master',
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api', // Configuração da API
    },
  },

  css: [
    'bootstrap/dist/css/bootstrap.min.css', 
    '@/styles/main.css', 
  ],

  typescript: {
    strict: true
  },

  compatibilityDate: '2024-12-06'
});