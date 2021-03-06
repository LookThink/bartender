var yaml   = require('yamljs'),
    config = yaml.load('./gulp/config.yml')
;

if(!config.tasks.fonts) return

var browserSync = require('browser-sync'),
		changed     = require('gulp-changed'),
		gulp        = require('gulp'),
		path        = require('path')
;

var paths = {
  src: path.join(config.root.src, config.tasks.fonts.src, '/**/*'),
  dest: path.join(config.root.dest, config.tasks.fonts.dest)
};

var processFonts = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
};

gulp.task('fonts', processFonts);
module.exports = processFonts;
