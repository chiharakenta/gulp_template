var gulp             = require('gulp');
var sass             = require('gulp-sass');
var header           = require('gulp-header');
var replace          = require('gulp-replace');
var postcss          = require('gulp-postcss');
var autoprefixer     = require('autoprefixer');
var cleanCSS         = require('gulp-clean-css');
var rename           = require("gulp-rename");
var uglify           = require('gulp-uglify');
var imagemin         = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg  = require("imagemin-mozjpeg");

gulp.task('html', function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([autoprefixer()]))
    .pipe(replace(/@charset "UTF-8";/g, ''))
    .pipe(header('@charset "UTF-8";\n\n'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('mincss', function() {
  return gulp.src("./dist/css/style.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function() {
  return gulp.src("./src/js/*.js")
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('minjs', function() {
  return gulp.src("./dest/js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js/'));
});

var imageminOption = [
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
    .src( './src/img/*.{png,jpg,gif,svg}' )
    .pipe( imagemin( imageminOption ) )
    .pipe( gulp.dest( './dist/img' ) );
});

gulp.task( 'default', function() {
  gulp.watch( './src/*.html', gulp.task( 'html' ));
  gulp.watch( './src/sass/**/*.scss', gulp.series(gulp.task( 'sass' ), gulp.task('mincss')) );
  gulp.watch( './src/js/**/*.js', gulp.task( 'minjs' ) );
  gulp.watch( './src/img/*.{png,jpg,gif,svg}', gulp.task( 'imagemin'));
});