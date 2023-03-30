/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');

// HTML
const fileinclude = require('gulp-file-include');
// CSS
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
// JS
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// Others
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');

const paths = {
  sass: './src/sass/**/*.scss',
  css: './dist/css',
  js: ['./src/js/**/*.js', '!./src/js/modules/**/*.js'],
  jsDist: './dist/js',
  img: './src/img/**/*',
  imgDist: './dist/img',
  html: ['./src/**/*.html', '!./src/html/**/*.html'],
  dist: './dist',
};

function html(done) {
  gulp
    .src(paths.html)
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest(paths.dist));

  done();
}

function buildStyles(done) {
  gulp
    .src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css));
  done();
}

function javascript(done) {
  gulp
    .src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.jsDist));
  done();
}

function convertImg(done) {
  gulp.src(paths.img).pipe(imagemin()).pipe(gulp.dest(paths.imgDist));
  done();
}

function startBrowserSync(done) {
  browserSync.init({
    server: {
      baseDir: paths.dist,
    },
    open: true,
    browser: 'chrome',
  });
  done();
}

function cleanStuff(done) {
  gulp
    .src(paths.dist, {
      read: false,
      allowEmpty: true,
    })
    .pipe(clean());
  done();
}

function watchForChanges(done) {
  gulp.watch(paths.html[0], html).on('change', browserSync.reload);
  gulp.watch(paths.sass, buildStyles).on('change', browserSync.reload);
  gulp.watch(paths.js, javascript).on('change', browserSync.reload);
  gulp.watch(paths.img, convertImg).on('change', browserSync.reload);
  done();
}

const build = gulp.parallel(html, buildStyles, javascript, convertImg);

exports.default = gulp.series(build, startBrowserSync, watchForChanges);

exports.cleanStuff = cleanStuff;
exports.build = build;
exports.server = gulp.series(startBrowserSync, watchForChanges);
