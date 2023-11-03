module.exports = {

  "apps": [
    {
      "name": "my-app",
      "script": "dist/index.js",
      "watch": true,
      "ignore_watch": ["node_modules", "logs"],
      "instances": "max",
      "exec_mode": "cluster",
      // "env": {
      //   "NODE_ENV": "production"
      // }
    }
  ]
    // apps: [
    //   {
    //     name: 'my-app',
    //     // script: 'node_modules/.bin/concurrently',
    //     script: 'node_modules/.bin/ concurrently \"npx tsc -w\" \"nodemon dist/index.js\"',
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
    // apps: [
    //   {
    //     name: 'your-app-name',
    //     script: 'dist/index.js',
    //     instances: 'max', // You can adjust the number of instances as needed
    //     exec_mode: 'cluster', // Use the cluster mode for better performance
    //     watch: true, // Automatically restart the app when files change
    //     ignore_watch: ['node_modules'],
    //   },
    // ],
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