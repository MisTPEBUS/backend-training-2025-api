// swagger.config.js
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'My API Docs',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
    // 根據專案結構調整路徑
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
  };
  
  module.exports = options;
  