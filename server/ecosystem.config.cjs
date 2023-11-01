// ecosystem.config.cjs
const { createRequire } = require('module');
const require = createRequire(import.meta.url);

// Import the ESM configuration file using dynamic import
const esmConfig = await import('./ecosystem.config.js');

module.exports = esmConfig.default;
module.exports = {
    apps: [
      {
        name: 'my-app',
        script: 'node_modules/.bin/concurrently',
        args: [
          'node_modules/.bin/tsc -w',  // Watch TypeScript files
          'node_modules/.bin/nodemon dist/index.js',  // Run the compiled app.js
        ],
        watch: true,  // Enable automatic restarts on file changes
        interpreter: 'none',  // Avoid interpreting your command
      },
    ],
  };
  