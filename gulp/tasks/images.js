var yaml         = require('yamljs'),
    config       = yaml.load('./gulp/config.yml')
;

if (!config.tasks.images) return;

var browserSync = require('browser-sync')
    changed     = require('gulp-changed'),
    gulp        = require('gulp'),
    imagemin    = require('gulp-imagemin'),
    path        = require('path')
;

var paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.join(config.root.dest, config.root.archiveName, config.tasks.images.dest)
};

var processImages = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dest));
};

// Images
// Run minification passes on all imagery
gulp.task('images', processImages);
module.exports = processImages;
