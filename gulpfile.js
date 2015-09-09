var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');

var PATH = {
  example: 'examples',
  library: 'lib',
  test: 'test'
};
var TESTS = [
  path.join('.', PATH.test, 'basemq.spec.js'),
  path.join('.', PATH.test, 'enum.spec.js')
];
var FILES = [
  // lib
  path.join('.', 'index.js'),
  path.join('.', PATH.library, 'basemq.js'),
  // enum
  path.join('.', PATH.library, 'enum', 'connection.js'),
  path.join('.', PATH.library, 'enum', 'heartbeat.js'),
  path.join('.', PATH.library, 'enum', 'loadbalancer.js'),
  path.join('.', PATH.library, 'enum', 'module.js'),
  // module
  path.join('.', PATH.library, 'module', 'connection.js'),
  // role
  path.join('.', PATH.library, 'role', 'broker.js'),
  path.join('.', PATH.library, 'role', 'client.js'),
  path.join('.', PATH.library, 'role', 'worker.js'),
  // examples
  path.join('.', PATH.example, 'basic', 'client.js'),
  path.join('.', PATH.example, 'basic', 'broker.js'),
  path.join('.', PATH.example, 'basic', 'worker.js')
].concat(TESTS);

gulp.task('jscs', function () {
  return gulp.src(FILES)
    .pipe(plugins.jscs());
});

gulp.task('jshint', ['jscs'], function () {
  return gulp.src(FILES)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('develop', ['jshint'], function() {
  gulp.watch(FILES, ['jshint']);
  gulp.watch(TESTS, ['test']);
});

gulp.task('test', ['jshint'], function() {
  return gulp.src(TESTS, {read: false})
    .pipe(plugins.mocha({reporter: 'spec'}));
});
