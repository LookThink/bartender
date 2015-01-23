// Call required plugins
var gulp = require("gulp"),
    livereload = require("gulp-livereload"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    scsslint = require("gulp-scss-lint"),
    sass = require("gulp-sass"),
    minifyCSS = require("gulp-minify-css"),
    remember = require("gulp-remember"),
    cache = require("gulp-cached"),
    imagemin = require("gulp-imagemin");


// Set project paths
var paths = {
  src: "src/",
  dest: "app/"
};


// Build Pipes

// Styles
gulp.task("styles", function() {
  return gulp.src(paths.src + "scss/**/*.scss")
    // Initialize sourcemapping
    .pipe(sourcemaps.init())
      // Run SCSS Lint on all SCSS files
      .pipe(scsslint({
        config: "default.yml",
        reporterOutput: "scssReport.xml"
      }))
      // Compile SCSS
      .pipe(sass({
        errLogToConsole: true
      }))
      // Autoprefix compiled CSS
      .pipe(autoprefixer({
        browsers: ["last 2 versions", "Explorer >= 8"],
        cascade: false
      }))
      // Minify compiled CSS
      .pipe(minifyCSS())
    // Create the sourcemap
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest + "css"));
});


// Image Management
gulp.task("images", function() {
  return gulp.src(paths.src + "images/**/*")
    .pipe(cache("images"))
    .pipe(imagemin())
    .pipe(remember("images"))
    .pipe(gulp.dest(paths.dest + "images"))
});


gulp.task("default", function() {
  gulp.start("styles", "images");
});
