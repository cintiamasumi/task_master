import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  runtimeConfig: {
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || '',
    dbName: process.env.DB_NAME || 'task_master',
  },
});

