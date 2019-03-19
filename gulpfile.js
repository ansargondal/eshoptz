let gulp = require('gulp'),
    sass = require('gulp-sass'),
    header = require('gulp-header'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    // php = require('gulp-connect-php'),
    browserSync = require('browser-sync').create();


// Compile SCSS
gulp.task('css:compile', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
    return gulp.src([
        './css/*.css',
        '!./css/*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

//copy js files
// gulp.task('js:copy', function () {
//     gulp.src('./resources/assets/js/**/*.js').pipe(gulp.dest('./public/js'));
// });
//
// Minify JavaScript
gulp.task('js:minify', function () {
    return gulp.src([
        './js/*.js',
        '!./js/*.min.js'
    ])
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.stream());
});

gulp.task('php', function () {
    php.server({
        base: './',
        port: 8010,
        keepalive: true
    })
});

// JS
// gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css']);

// Configure the browserSync task
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            proxy: 'localhost:8010',
            baseDir: './',
            open: true,
            notify: false
        }
    });
});

// Dev task
gulp.task('dev', ['css', 'browserSync'], function () {
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./js/*.js', browserSync.reload);
    gulp.watch('./**/*.html', browserSync.reload);
});
