var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var replace = require('gulp-replace');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");
var browsersync = require("browser-sync").create();

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(replace(/@charset "UTF-8";/g, ''))
    .pipe(header('@charset "UTF-8";\n\n'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('mincss', function () {
  return gulp.src("./dist/css/style.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('js', function () {
  return gulp.src("./src/js/*.js")
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('minjs', function () {
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

gulp.task('imagemin', function () {
  return gulp
    .src('./src/img/*.{png,jpg,gif,svg}')
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest('./dist/img'));
});

// サーバーを立ち上げる
gulp.task('build-server', function (done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  done();
  console.log('Server was launched');
});

// ブラウザのリロード
gulp.task('browser-reload', function (done) {
  browsersync.reload();
  done();
  console.log('Browser reload completed');
});

gulp.task('watch-files', function (done) {
  gulp.watch("./dist/*.html", gulp.task('browser-reload'));
  gulp.watch("./dist/css/*.css", gulp.task('browser-reload'));
  gulp.watch("../dist/js/*.js", gulp.task('browser-reload'));
  done();
  console.log(('gulp watch started'));
});

gulp.task('default', gulp.series('build-server', 'watch-files', function(done) {
  done();
  gulp.watch('./src/*.html', gulp.task('html'));
  gulp.watch('./src/sass/**/*.scss', gulp.series(gulp.task('sass'), gulp.task('mincss')));
  gulp.watch('./src/js/**/*.js', gulp.task('minjs'));
  gulp.watch('./src/img/*.{png,jpg,gif,svg}', gulp.task('imagemin'));
}));