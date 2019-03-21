var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var rename   = require("gulp-rename");
var uglify = require('gulp-uglify');

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./",
          index: "index.html"
      }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task( 'default', gulp.series( gulp.parallel( 'browser-sync' ) ), function() {
  gulp.watch( './*.html', gulp.task( 'bs-reload' ) );
  gulp.watch( './css/*.css', gulp.task( 'bs-reload' ) );
  gulp.watch( './js/*.js', gulp.task( 'bs-reload' ) );
});

gulp.task('mincss', function() {
  return gulp.src("css/*.css")
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