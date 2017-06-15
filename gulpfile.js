'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');

var PATH = {
  example: 'examples',
  library: 'lib',
  test: 'test'
};
var TESTS = [
  // enum
  path.join('.', PATH.test, 'enum.spec.js'),
  // module
  path.join('.', PATH.test, 'pubsub.spec.js'),
  path.join('.', PATH.test, 'pushpull.spec.js'),
  path.join('.', PATH.test, 'reqrep.spec.js'),
  path.join('.', PATH.test, 'send.spec.js'),
  // core
  path.join('.', PATH.test, 'basemq.spec.js')
];
var LIBRARY = [
  path.join('.', 'index.js'),
  // enum
  path.join('.', PATH.library, 'enum', 'module.js'),
  path.join('.', PATH.library, 'enum', 'socket.js'),
  // module
  path.join('.', PATH.library, 'module', 'config.js'),
  path.join('.', PATH.library, 'module', 'connection.js'),
  path.join('.', PATH.library, 'module', 'message.js'),
  path.join('.', PATH.library, 'module', 'socket.js'),
  // core
  path.join('.', PATH.library, 'basemq.js')
];
var FILES = [
  path.join('.', 'gulpfile.js')
].concat(LIBRARY).concat(TESTS);

gulp.task('jscs', function () {
  return gulp.src(FILES)
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter())
    .pipe(plugins.jscs.reporter('fail'));
});

gulp.task('jshint', ['jscs'], function () {
  return gulp.src(FILES)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('develop', ['jshint'], function () {
  gulp.watch(FILES, ['jshint']);
  gulp.watch(TESTS, ['test']);
});

gulp.task('test', ['jshint'], function () {
  return gulp.src(TESTS, { read: false })
    .pipe(plugins.mocha({ reporter: 'spec' }));
});
