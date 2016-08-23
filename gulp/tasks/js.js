// Ran out of time, so I gotta use this.

// Scripts
var yaml         = require('yamljs'),
    config       = yaml.load('./gulp/config.yml')
;

if (!config.tasks.js) return;

var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    handleErrors = require('../lib/handleErrors'),
    jshint       = require('gulp-jshint'),
    sourcemaps   = require('gulp-sourcemaps'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    path         = require('path'),
    gutil        = require('gulp-util')
;

var paths = {
  src: path.join(config.root.src, config.tasks.js.src, '/**/*.js'),
  dest: path.join(config.root.dest, config.tasks.js.dest)
};

var allPaths     = [],
    jsPaths      = [],
    vendorPaths  = [],
    vendorAssets = config.tasks.js.vendorAssets,
    jsAssets     = config.tasks.js.localAssets;

var getPaths = function() {
  for (var i in jsAssets) {
    jsPaths.push(path.join(config.root.src, config.tasks.js.src, jsAssets[i]));
  }

  for (var i in vendorAssets) {
    vendorPaths.push(path.join(config.tasks.js.vendorSrc, vendorAssets[i]));
  }

  allPaths = vendorPaths.concat(jsPaths);
}();

var processJs = function() {
  return gulp.src(allPaths)
    .on('error', handleErrors)
    // Initialize sourcemapping
    .pipe(sourcemaps.init())
      // Run JSHint on all JS files
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      // Concatenate JS filels in the order specified
      // in the paths.scripts variable
      .pipe(concat("app.js"))
      // Uglify (minimize) the concatenated file
      .pipe(global.production ? uglify() : gutil.noop())
    // Create the sourcemap
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}


gulp.task('js', processJs);

module.exports = processJs;