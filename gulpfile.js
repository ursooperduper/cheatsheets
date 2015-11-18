var gulp          = require('gulp');
var sourcemaps    = require('gulp-sourcemaps');
var sass          = require('gulp-sass');
var scsslint      = require('gulp-scss-lint');
var autoprefixer  = require('gulp-autoprefixer');
var exec          = require('child_process').exec;
var haml          = require('gulp-ruby-haml');

// Default task
gulp.task('default', ['watch']);

// Haml
gulp.task('haml:index', function() {
  gulp.src('./*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./'));
});

gulp.task('haml:layouts', function() {
  gulp.src('_layouts/_haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('_layouts'));
});

gulp.task('haml:includes', function() {
  gulp.src('_includes/_haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('_includes'));
});

// Sass (Compile and Linting)
gulp.task('sass', function () {
  gulp.src('css/scss/*.scss')
    .pipe(scsslint({
      'bundleExec': true
    }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

// CSS Autoprefixer
gulp.task('autoprefixer', function () {
  return gulp.src('css/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
});

// Watcher
gulp.task('watch', function() {
  gulp.watch('./*.haml', ['haml:index']);
  gulp.watch('_includes/_haml/*.haml', ['haml:includes']);
  gulp.watch('_layouts/_haml/*.haml', ['haml:layouts']);
  gulp.watch('css/scss/*.scss', ['sass']);
  gulp.watch('css/*.css', ['autoprefixer']);
});
