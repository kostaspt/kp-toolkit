var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

var DEST = 'build/';

gulp.task('clean', function(cb) {
    del([DEST], cb);
});

gulp.task('default', ['clean'], function() {
    gulp.src('./sass/build.scss')
        .pipe(sass())
        .pipe(rename('essentials.css'))
        .pipe(gulp.dest(DEST))
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST));

    gulp.src(['./sass/variables.scss', './sass/_spacers.scss'])
        .pipe(concat('essentials-spacers.scss'))
        .pipe(sass())
        .pipe(gulp.dest(DEST))
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST));
});
