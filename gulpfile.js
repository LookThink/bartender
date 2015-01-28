// Call required plugins
var gulp = require("gulp"),
    livereload = require("gulp-livereload"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    scsslint = require("gulp-scss-lint"),
    sass = require("gulp-sass"),
    minifyCSS = require("gulp-minify-css"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    remember = require("gulp-remember"),
    cache = require("gulp-cached"),
    imagemin = require("gulp-imagemin");


// Set project paths
// 
// Scripts var sets JS load order for Concat.
// Ex: ["vendor/pluginName/plugin.js",
//      "js/custom.js",
//      "js/scripts.js"]
var paths = {
  src: "src/",
  dest: "app/",
  scripts: []
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
    .pipe(gulp.dest(paths.dest + "css"))
    .pipe(livereload());
});


// Scripts
gulp.task("scripts", function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(concat("scripts.js"))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest + "scripts"))
    .pipe(livereload());
});


// Image Management
gulp.task("images", function() {
  return gulp.src(paths.src + "images/**/*")
    .pipe(cache("images"))
    .pipe(imagemin())
    .pipe(remember("images"))
    .pipe(gulp.dest(paths.dest + "images"))
    .pipe(livereload());
});


// Default Task
gulp.task("default", function() {
  gulp.start("styles", "scripts", "images");
});


// Watch Task
gulp.task("watch", function() {
  gulp.watch(paths.src + "scss/**/*.scss", ["styles"]);
  gulp.watch(paths.scripts, ["scripts"]);
  gulp.watch(paths.src + "images/**/*", ["images"]);
});
