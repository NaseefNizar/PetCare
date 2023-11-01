module.exports = {
    apps: [
      {
        name: 'my-app',
        script: 'node_modules/.bin/concurrently',
        args: [
          'node_modules/.bin/tsc -w',  // Watch TypeScript files
          'node_modules/.bin/nodemon dist/app.js',  // Run the compiled app.js
        ],
        watch: true,  // Enable automatic restarts on file changes
        interpreter: 'none',  // Avoid interpreting your command
      },
    ],
  };
  