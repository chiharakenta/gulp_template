var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var cleanCSS = require('gulp-clean-css');
var rename   = require("gulp-rename");
var uglify = require('gulp-uglify');
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./css'));
});

gulp.task('mincss', function() {
  return gulp.src("./css/*.css")
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

/* var imageminOption = [
  imageminPngquant({ quality: '65-80' }),
  imageminMozjpeg({ quality: 85 }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256
  }),
  imagemin.jpegtran(),
  imagemin.optipng(),
  imagemin.svgo()
];

gulp.task( 'imagemin', function() {
  return gulp
    .src( './img/base/*.{png,jpg,gif,svg}' )
    .pipe( imagemin( imageminOption ) )
    .pipe( gulp.dest( './img' ) );
}); */

gulp.task( 'watch', function() {
  gulp.watch( './sass/**/*.scss', gulp.series(gulp.task( 'sass' ), gulp.task( 'mincss' ) ) );
  gulp.watch( './js/**/*.js', gulp.task( 'minjs' ) );
});