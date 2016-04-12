if (global.production) return;

var browserSync        = require('browser-sync'),
    gulp               = require('gulp'),
    webpack            = require('webpack'),
    webpackMultiConfig = require('../lib/webpackMultiConfig.js'),
    yaml               = require('yamljs'),
    config             = yaml.load('./gulp/config.yml')
;

var browserSyncTask = function() {
  var webpackConfig = webpackMultiConfig('development'),
      compiler = webpack(webpackConfig);

  config.tasks.browserSync.server.middleware = [
    require('webpack-dev-middleware')(compiler, {
      stats: 'errors-only',
      publicPath: '/' + webpackConfig.output.publicPath
    }),
    require('webpack-hot-middleware')(compiler)
  ];

  browserSync.init(config.tasks.browserSync);
}

gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;