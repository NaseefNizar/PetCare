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
    apps: [
        {
          name: 'my-app',
          script: 'npm',
          args: 'start',
          watch: true,  // Enable automatic restarts on file changes
          interpreter: 'none',  // Avoid interpreting your command
        },
      ],
  };