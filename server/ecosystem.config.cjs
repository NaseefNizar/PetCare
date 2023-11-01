// ecosystem.config.cjs
const { createRequire } = require('module');

async function loadConfig() {
  // Import the ESM configuration file using dynamic import
  const esmConfig = await import('./ecosystem.config.js');

  // Export the default configuration
  module.exports = esmConfig.default;
}

// Call the asynchronous function to load the configuration
loadConfig();