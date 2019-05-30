'use strict';

const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

sass.compiler = require('node-sass');

gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|njk)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('build/'))
});

gulp.task('sass', function() {
  return gulp.src('./app/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/pages/**/*.+(html|njk)', gulp.parallel('nunjucks'));
  gulp.watch('./app/**/*.scss', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('nunjucks', 'sass'));