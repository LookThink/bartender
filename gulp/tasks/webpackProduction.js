var yaml   = require('yamljs'),
    config = yaml.load('./gulp/config.yml')
;

if(!config.tasks.js) return;

var config  = require('../lib/webpackMultiConfig')('production'),
		gulp    = require('gulp'),
		logger  = require('../lib/compileLogger'),
		webpack = require('webpack')
;

var webpackProductionTask = function(cb) {
  webpack(config, function(err, stats) {
    logger(err, stats);
    cb();
  });
};

gulp.task('webpack:production', webpackProductionTask);
module.exports = webpackProductionTask;
