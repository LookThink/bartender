var yaml   = require('yamljs'),
    config = yaml.load('./gulp/config.yml'),
    gulp         = require('gulp'),
    gulpSequence = require('gulp-sequence'),
    getEnabledTasks = require('../lib/getEnabledTasks')
;

var buildTask = function(cb) {
    var tasks = getEnabledTasks('build');
    
    gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'static', cb);
};

gulp.task('build', buildTask);
module.exports = buildTask;
