var yaml         = require('yamljs'),
    config       = yaml.load('./gulp/config.yml')
;

if (!config.tasks.css) return;

var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    handleErrors = require('../lib/handleErrors'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    postCss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    path         = require('path')
;

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.root.archiveName, config.tasks.css.dest)
};

// define postcss tasks
var autoprefixer  = autoprefixer(config.tasks.css.postCss.autoprefixer),
    cssnano       = cssnano(config.tasks.css.postCss.cssnano),
    postcssConfig = [
      autoprefixer,
      cssnano
    ]
;

// CSS
// Compile SCSS files and run PostCSS on output
// PostCSS handles autoprefixing and minification
var processScss = function() {
  // Actual task
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(sass()
    .on('error', handleErrors))
    .pipe(postCss(postcssConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
  ;
};

gulp.task('css', processScss);

module.exports = processScss;