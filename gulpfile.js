'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const path = require('path');

const PATH = {
  example: 'examples',
  library: 'lib',
  test: 'test',
};
const TESTS = [
  // enum
  // path.join('.', PATH.test, 'enum.spec.js'),
  // module
  // path.join('.', PATH.test, 'pubsub.spec.js'),
  // path.join('.', PATH.test, 'pushpull.spec.js'),
  // path.join('.', PATH.test, 'reqrep.spec.js'),
  // path.join('.', PATH.test, 'send.spec.js'),
  // core
  path.join('.', PATH.test, 'basemq.test.js'),
];
const LIBRARY = [
  // path.join('.', 'index.js'),
  // enum
  // path.join('.', PATH.library, 'enum', 'module.js'),
  // path.join('.', PATH.library, 'enum', 'socket.js'),
  // module
  // path.join('.', PATH.library, 'module', 'config.js'),
  // path.join('.', PATH.library, 'module', 'connection.js'),
  // path.join('.', PATH.library, 'module', 'message.js'),
  // path.join('.', PATH.library, 'module', 'socket.js'),
  // core
  path.join('.', PATH.library, 'basemq.js'),
];
const FILES = [
  path.join('.', 'gulpfile.js'),
].concat(LIBRARY).concat(TESTS);

gulp.task('lint', () => (gulp.src(FILES)
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failAfterError())
));

gulp.task('develop', () => {
  gulp.watch(FILES, ['lint']);
  gulp.watch(TESTS, ['test']);
});

gulp.task('test', ['lint'], () => (gulp.src(PATH.test, { read: false })
  .pipe(plugins.jest.default())
));
