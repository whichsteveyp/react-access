const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

// these are intended for internal use only, and not exposed for gulp tasks
// hence, the _ prefix
function _mocha() {
  return gulp.src(['test/setup/node.js', 'test/unit/*.js'])
    .pipe(plugins.mocha({
      reporter: 'dot',
      // globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

function _registerBabel() {
  require('babel-register');
}

// Run the mocha suite, ensuring babel is registered
function mocha() {
  _registerBabel();
  return _mocha();
}

module.exports = {
  mocha
}
