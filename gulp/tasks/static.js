var yaml   = require('yamljs'),
    config = yaml.load('./gulp/config.yml'),
    changed = require('gulp-changed'),
    gulp    = require('gulp'),
    path    = require('path')
;

var paths = {
  src: path.join(config.root.src, config.tasks.static.src, '/**'),
  dest: path.join(config.root.dest, config.root.archiveName, config.tasks.static.dest)
};

var staticTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
  ;
};

gulp.task('static', staticTask);
module.exports = staticTask;
