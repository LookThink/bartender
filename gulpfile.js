// Set source and destination folders
var sF = 'src/';
var dF = 'app/';

// Include gulp
var gulp = require('gulp');

// Include plugins
var sass = require('gulp-ruby-sass'),
    scsslint = require('gulp-scss-lint'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    uglify = require('gulp-uglify'),
    del = require('del');

// HTML
gulp.task('html', function() {
  return gulp.src(sF + '**/*.html')
    .pipe(gulp.dest(dF + ''))
    .pipe(notify({message: 'HTML task complete.'}));
});

// SCSS Tasks
gulp.task('styles', function() {
  return gulp.src(sF + 'scss/*.scss')
    .pipe(scsslint({config: 'lint.yml'}))
    .pipe(sass({sourcemap: true, sourcemapPath: '../scss'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(dF + 'assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(dF + 'assets/css'))
    .pipe(notify({message: 'Styles task complete.'}));
});

// JS Tasks
gulp.task('scripts', function() {
  return gulp.src(sF + 'js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(dF + 'assets/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dF + 'assets/scripts'))
    .pipe(notify({message: 'Scripts task complete.'}));
});

// Image Minification Task
gulp.task('images', function() {
  return gulp.src(sF + 'images/**/*')
    .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest(dF + 'assets/images'))
    .pipe(notify({message: 'Images task complete.'}))
});

// Move Asset Folders
gulp.task('moveassets', function() {
  return gulp.src(sF + 'fonts')
    .pipe(gulp.dest(dF + 'fonts'))
    .pipe(notify({message: 'Move Assets task complete.'}));
});

// Clean Up
gulp.task('clean', function(cb) {
  del([dF + 'assets/css', dF + 'assets/scripts', dF + 'assets/images'], cb)
});

// Default Task
gulp.task('default', ['clean'], function() {
  gulp.start('html', 'styles', 'scripts', 'images', 'moveassets');
});

// Watch Task
gulp.task('watch', function() {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/scss/*.scss', ['styles']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/fonts/*', ['moveassets']);
});

// Clear Task
gulp.task('clear', function(done) {
  return cache.clearAll(done);
})
