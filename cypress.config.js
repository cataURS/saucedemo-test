const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = config.env.baseUrl;
      
      config.env = {
        ...config.env,
        username: config.env.username,
        password: config.env.password
      };
      
      return config;
    },
  },
  allowCypressEnv: false,
})