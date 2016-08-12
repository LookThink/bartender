var gulp   = require('gulp'),
    del    = require('del'),
    yaml   = require('yamljs'),
    config = yaml.load('./gulp/config.yml')
;

var cleanTask = function (cb) {
  del([config.root.dest]).then(function (paths) {
    cb();
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
