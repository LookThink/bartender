var yaml   = require('yamljs'),
    config = yaml.load('./gulp/config.yml'),
    gulp   = require('gulp'),
    path   = require('path'),
    watch  = require('gulp-watch');

var watchTask = function() {
  var watchableTasks = config.tasks.watchableTasks;

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName];

    if(task) {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');

      watch(glob, function() {
        require('./' + taskName)();
      });
    }
  });
};

// gulp.task('watch', ['browserSync'], watchTask);
gulp.task('watch', watchTask);
module.exports = watchTask;
