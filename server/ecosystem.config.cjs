module.exports = {
    // apps: [
    //   {
    //     name: 'my-app',
    //     script: 'node_modules/.bin/concurrently',
    //     args: [
    //       'node_modules/.bin/tsc -w',  // Watch TypeScript files
    //       'node_modules/.bin/nodemon dist/index.js',  // Run the compiled app.js
    //     ],
    //     watch: true,  // Enable automatic restarts on file changes
    //     interpreter: 'none',  // Avoid interpreting your command
    //   },
    // ],
    // apps: [
    //     {
    //       name: 'my-app',
    //       script: 'index.js',
    //       args: 'start',
    //       watch: true,  // Enable automatic restarts on file changes
    //       interpreter: 'none',  // Avoid interpreting your command
    //     },
    //   ],
    // apps: [
    //     {
    //       name: 'my-app',
    //       script: 'node_modules/ts-node/dist/bin.js',
    //       args: 'src/index.ts',
    //       instances: 1,
    //       autorestart: true,
    //       watch: true, 
    //     }
    // ]
    apps: [
      {
        name: 'my-app-dev',
        script: 'node_modules/.bin/concurrently',
        args: [
          'tsc -p ./src/server -w',  // Watch TypeScript files
          'nodemon ./dist/server/server.js',  // Run the compiled server
        ],
        instances: 1,  // Number of instances you want to run (can be adjusted)
        exec_mode: 'cluster',  // You can choose 'cluster' or 'fork' mode
        watch: true,  // Enable automatic restarts on file changes
        interpreter: 'none',  // Avoid interpreting your command
      },
    ],
  };




  // ecosystem.config.cjs
// const { createRequire } = require('module');

// async function loadConfig() {
  // Import the ESM configuration file using dynamic import
  // const esmConfig = await import('./ecosystem.config.js');

  // Export the default configuration
  // module.exports = esmConfig.default;
// }

// Call the asynchronous function to load the configuration
// loadConfig();