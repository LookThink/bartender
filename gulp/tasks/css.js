var yaml         = require('yamljs'),
    config       = yaml.load('./gulp/config.yml')
;

if (!config.tasks.css) return;

var gulp         = require('gulp'),
    path         = require('path'),
    browserSync  = require('browser-sync'),
    handleErrors = require('../lib/handleErrors'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    cssnext      = require('postcss-cssnext'),
    assets       = require('postcss-assets'),
    colorguard   = require('gulp-colorguard'),
    cssnano      = require('gulp-cssnano')
;

var paths = {
  src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.css.dest)
};

// define postcss tasks
var cssnext       = cssnext(config.tasks.css.postcss.cssnext),
    assets        = assets(config.tasks.css.postcss.assets),
    colorguard    = colorguard(config.tasks.css.postcss.colorguard),
    cssnano       = cssnano(config.tasks.css.postcss.cssnano),
    postcssConfig = [
      cssnext,
      assets,
      colorguard,
      //  TODO - Only run cssnano in Prod, not Dev
      cssnano
    ]
;

// CSS
// Compile SCSS files and run PostCSS on output
// PostCSS handles autoprefixing and minification
var processCSS = function() {
  // Actual task
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
      .on('error', handleErrors)
    .pipe(postcss(postcssConfig))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
  ;
};

gulp.task('css', processCSS);

module.exports = processCSS;
