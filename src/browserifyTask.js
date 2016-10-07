'use strict';

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var streamify = require('gulp-streamify');
var watch = require('gulp-watch');
var refillGlobby = require('refill-globby');
var refillLogger = require('refill-logger');
var RefillNextHandler = require('refill-next-handler');
var browserifyNgannotate = require('browserify-ngannotate');
var babelify = require('babelify');
var babelPresetEs2015 = require('babel-preset-es2015');

var defaultOptions = {
  devEntries: 'src/dev/index.js',
  prodEntries: 'src/index.js',
  testEntries: 'src/test/index.js',
  browserifyTransforms: [
    [babelify, {
      presets: [babelPresetEs2015]
    }],
    browserifyNgannotate
  ]
};

module.exports = {
  getTask: getBrowserifyTask,
  defaultOptions: defaultOptions
};

function getBrowserifyTask(options, gulp, mode, getOutputDir) {

  function browserifyTask(next) {

    var logger = refillLogger('js');
    var bundler;
    var nextHandler;
    var rebundlePromise;

    var noEnvJsFilesMessage =
      '\nNo ' + mode.env + ' js entry files found,\n' +
      'falling back to prod.\n\n' +
      'Your ' + mode.env + ' js entry files are determined by globs\n' +
      getEntries().toString() + '\n\n' +
      'You can add some environment specific js to handle mocks.\n' +
      'Learn more about AngularJS mocks:\n' +
      'https://code.angularjs.org/1.5.8/docs/api/ngMockE2E\n';

    var noJsFilesMessage =
      '\nNo js entry files found.\n\n' +
      'Your js entry files are determined by globs\n' +
      options.prodEntries.toString() + '\n\n' +
      'You can add some matching files with JavaScript.\n' +
      'Learn more about Refill JavaScript toolstack:\n' +
      'https://angularjs.org/\n' +
      'http://browserify.org/\n' +
      'https://babeljs.io/\n' +
      'https://github.com/omsmith/browserify-ngannotate\n';

    function getEntries() {

      if (mode.angularMainModuleProdFallback || mode.env === 'prod') {
        return options.prodEntries;
      }

      if (mode.env === 'test') {
        return options.testEntries;
      }

      return options.devEntries;

    }

    function rebundle() {

      return nextHandler.handle(new Promise(function (resolve, reject) {

        bundler.bundle()
          .on('error', reject)
          .pipe(source('index.js'))
          .pipe(gulpif(mode.env !== 'dev' && !mode.watch, streamify(uglify(options.uglify))))
          .pipe(gulpif(mode.env !== 'dev' && !mode.watch, streamify(rev())))
          .pipe(gulp.dest(getOutputDir()))
          .on('end', resolve);

      }));

    }

    function checkEntries() {

      function checkProdEntries() {
        return nextHandler.handle(
          refillGlobby(options.prodEntries, noJsFilesMessage), {
            ignoreFailures: true,
            handleSuccess: false
          });
      }

      if (mode.env === 'prod') {
        return checkProdEntries();
      }

      return refillGlobby(getEntries(), noEnvJsFilesMessage)
        .catch(function(error) {
          logger.info(error);
          mode.angularMainModuleProdFallback = true;
          return checkProdEntries();
        });

    }

    function runBrowserify() {

      bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        entries: getEntries(),
        debug: mode.env === 'dev'
      });

      options.browserifyTransforms.forEach(function(transform) {
        bundler.transform(transform);
      });

      if (mode.watch) {
        bundler = watchify(bundler);
      }

      rebundlePromise = rebundle()
        .then(rebundleOnUpdate, rebundleOnUpdate);

      function rebundleOnUpdate() {
        if (!mode.watch) {
          return;
        }
        bundler.on('update', function(path) {
          logger.changed(path);
          rebundlePromise = rebundlePromise.then(rebundle, rebundle);
        });
      }

    }

    nextHandler = new RefillNextHandler({
      next: next,
      watch: mode.watch,
      logger: logger
    });

    checkEntries()
      .then(runBrowserify)
      .then(watchEntries, watchEntries);

    function watchEntries() {
      if (!mode.watch) {
        return;
      }
      watch(
        getEntries(), {
          events: ['add', 'unlink']
        })
        .on('add', function(event) {
          logger.changed(event);
          runBrowserify();
        })
        .on('unlink', function(event) {
          logger.changed(event);
          bundler.close();
          logger.finished();
        });
    }

  }

  return browserifyTask;

}