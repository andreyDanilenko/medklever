
const { src, watch, dest, parallel, series } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const rimraf = require('rimraf');

const DIST_DIR = './dist';
const SRC_DIR = './src';

function serve() {
  browserSync.init({
    server: {
      baseDir: DIST_DIR
    }
  });

  build();

  watch(`${SRC_DIR}/**/*.scss`, style);
  watch(`${SRC_DIR}/**/*.pug`, markup);
  watch(`${SRC_DIR}/assets/**/*`, assets);
};

function style() {
  return src(`${SRC_DIR}/styles/style.scss`)
    .pipe(sass())
    .pipe(dest(DIST_DIR))
    .pipe(browserSync.stream());
};

function markup() {
  return src(`${SRC_DIR}/pages/**/*pug`)
    .pipe(pug({
      basedir: SRC_DIR
    }))
    .pipe(dest(DIST_DIR))
    .pipe(browserSync.stream());
};

function assets() {
  return src(`${SRC_DIR}/assets/**/*`)
    .pipe(dest(`${DIST_DIR}/assets`))
    .pipe(browserSync.stream());
}

function cleanup(cb) {
  rimraf.sync(DIST_DIR);
  cb();
}

const build = series([
  cleanup,
  parallel([markup, style, assets])
]);

exports.default = serve;
exports.build = build;