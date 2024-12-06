const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'task_master',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    migrations: {
      path: path.resolve(__dirname, 'server/db/migrations'), // Caminho das migrações
      pattern: /\.js$/, // Apenas arquivos JavaScript
    },
    models: {
      path: path.resolve(__dirname, 'server/db/models'), // Caminho dos modelos
      pattern: /\.js$/, // Apenas arquivos JavaScript
    },
    undercored: true
    
  },
};
