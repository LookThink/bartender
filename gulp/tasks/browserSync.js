if (global.production) return;

var browserSync        = require('browser-sync'),
    gulp               = require('gulp'),
    yaml               = require('yamljs'),
    config             = yaml.load('./gulp/config.yml')
;

var browserSyncTask = function() {
  browserSync.init(config.tasks.browserSync);
}

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;