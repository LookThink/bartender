var gulp        = require('gulp'),
    zip         = require('gulp-zip'),
    yaml        = require('yamljs'),
    forceDeploy = require('../lib/forceDeploy'),
    config      = yaml.load('./gulp/config.yml'),
    credentials = yaml.load('./gulp/sfCredentials.yml');

var deploy = function() {
  return gulp.src('./pkg/**/*', {base: "."})
    .pipe(zip("pkg.zip"))
    .pipe(forceDeploy(
      credentials.sfUsername,
      credentials.sfPassword,
      credentials.sfSecurityToken
    )
  );
};

gulp.task('deploy', deploy);
module.exports = deploy;