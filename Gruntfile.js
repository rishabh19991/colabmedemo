grunt.loadNpmTasks('grunt-loopback-angular');
grunt.initConfig({
  loopback_angular: {
    options: {
      input: '../server/app.js',
      output: 'js/lb-services.js'
    }
  }
});
grunt.registerTask('default', ['loopbackangular']);