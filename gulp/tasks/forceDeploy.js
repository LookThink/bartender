var fs          = require('fs'),
    gulp        = require('gulp'),
    zip         = require('gulp-zip'),
    forceDeploy = require('./'),
    config      = yaml.load('./gulp/config.yml'),
    credential  = yaml.load('./gulp/credential.yml');

gulp.task('forceDeploy', function() {
  gulp.src('./pkg/**')
    .pipe(zip('srMC.zip'))
    .pipe(forceDeploy({
      username: credential.sfUsername,
      password: credential.sfPassword
      //, loginUrl: 'https://test.salesforce.com'
      //, pollTimeout: 120*1000
      //, pollInterval: 10*1000
      //, version: '33.0'
    }));
});

gulp.task('build', function(cb) {
  var data = "Random: " + Math.random();
  fs.writeFile(__dirname + '/pkg/staticresources/GulpJSforceTestResource.resource', data, cb);
});

gulp.task('deploy', [ 'build', 'forceDeploy' ]);