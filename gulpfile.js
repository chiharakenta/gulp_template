var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename   = require("gulp-rename");
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./css'));
});

gulp.task('mincss', function() {
  return gulp.src("./css/style.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css/'));
});
gulp.task('minjs', function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('js/'));
});

gulp.task( 'default', function() {
  gulp.watch( './sass/**/*.scss', gulp.series(gulp.task( 'sass' ), gulp.task('mincss')) );
  gulp.watch( './js/**/*.js', gulp.task( 'minjs' ) );
});