// Call required plugins
var gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass");


// Set project paths
var paths = {
  src: "src/",
  dest: "app/"
};


// Build pipes
// Styles (Sass Compiling / Minification)
gulp.task("styles", function() {
  return gulp.src(paths.src + "scss/**/*.scss")
    .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: true
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest + "css"));
});

gulp.task("default", function() {
  
});
