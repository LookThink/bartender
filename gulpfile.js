// Call dependencies
var gulp = require('gulp'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    imagemin = require('gulp-imagemin');

// Set project paths
var paths = {
  // Input
  src: 'src/',
  sass: paths.src + 'scss/**/*.scss',
  images: paths.src + 'img/**/*',
  // Output
  dest: 'dist/',
};


// CSS
// Compile SCSS files and run PostCSS on output
// PostCSS handles autoprefixing and minification
gulp.task('css', function() {
  // PostCSS processors / options
  var processors = [
    autoprefixer({
      browsers: ['last 2 versions', 'IE 9']
    }),
    cssnano({
      convertValues: false,
      zindex: false
    })
  ];

  // Actual task
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.dest + 'css/'));
});


// Images
// Run minification passes on all imagery
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(changed(paths.dest + '/images'))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dest + '/images'));
});



// Default task
gulp.task('default', ['css', 'images']);

// Watch task
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['css']);
});
