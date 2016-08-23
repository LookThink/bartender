var yaml            = require('yamljs'),
    config          = yaml.load('./gulp/config.yml'),
    gulp            = require('gulp'),
    gulpSequence    = require('gulp-sequence'),
    getEnabledTasks = require('../lib/getEnabledTasks')
;

var productionTask = function(cb) {
    global.production = true;
    
    var tasks = getEnabledTasks('production');
    
    gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'static', cb);
};

gulp.task('production', productionTask);
module.exports = productionTask;
