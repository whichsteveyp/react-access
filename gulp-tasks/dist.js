const del = require('del');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const path = require('path');

// infer our output configurations
const pkgjson = require('./../package.json');
const mainFile = pkgjson.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

function build() {
  return gulp.src(path.join('src', 'index.js'))
    .pipe(webpackStream({
      output: {
        filename: `${exportFileName}.js`,
        libraryTarget: 'umd',
        library: 'ReactAccess'
      },
      // externalize the `react` module, which should be a peerDep of the host module/app
      externals: {
        react: true,
      },
      module: {
        loaders: [
          {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest(destinationFolder))
    .pipe(plugins.filter(['**', '!**/*.js.map']))
    .pipe(plugins.rename(`${exportFileName}.min.js`))
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(destinationFolder));
}

function clean(done) {
  del([destinationFolder]).then(() => done());
}

module.exports = {
  build,
  clean,
}
