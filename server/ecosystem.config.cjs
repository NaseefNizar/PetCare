// ecosystem.config.cjs
const { createRequire } = require('module');
// const require = createRequire(import.meta.url);

// Import the ESM configuration file using dynamic import
const esmConfig = await import('./ecosystem.config.js');

module.exports = esmConfig.default;

  