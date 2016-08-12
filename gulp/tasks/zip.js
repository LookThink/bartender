var gulp         = require('gulp'),
    yaml         = require('yamljs'),
    zip          = require('gulp-zip'),
    del          = require('del'),
    config       = yaml.load('./gulp/config.yml')
;

var paths = {
  src: path.join(config.tasks.zip.src, '/**/*'),
  dest: path.join(config.tasks.zip.dest),
  fileName: config.root.archiveName + '.zip'
};

var zipPackage = function() {
  console.log(paths.src);
  return gulp.src(paths.src)
    .pipe(zip(paths.fileName))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('zip', zipPackage);
module.exports = zipPackage;