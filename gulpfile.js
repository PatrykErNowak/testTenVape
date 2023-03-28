/* eslint-disable import/no-extraneous-dependencies */
const gulp = require('gulp');
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

const paths = {
  sass: './src/sass/**/*.scss',
  css: './dist/css',
  js: './src/js/**/*.js',
  jsDist: './dist/js',
  img: './src/img/**/*',
  imgDist: './dist/img',
};

function buildStyles(done) {
  gulp
    .src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
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
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: '.min' }))
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
      baseDir: './',
    },
  });
  done();
}

function watchForChanges(done) {
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp
    .watch([paths.sass, paths.js], gulp.parallel(buildStyles, javascript))
    .on('change', browserSync.reload);
  gulp.watch(paths.img, convertImg).on('change', browserSync.reload);
  done();
}

const mainFunctions = gulp.parallel(buildStyles, javascript, convertImg);

exports.default = gulp.series(mainFunctions, startBrowserSync, watchForChanges);
