var gulp = require('gulp'),
    concat = require('gulp-concat'),
    del = require('del'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

var DEST = 'build/';

var sassOptions = {
    includePaths: [
        'bower_components/foundation/scss'
    ]
};

gulp.task('clean', function(cb) {
    del([DEST], cb);
});

gulp.task('compileFull', function() {
    return gulp.src('sass/build.scss')
        .pipe(sass(sassOptions))
        .pipe(rename('toolkit.css'))
        .pipe(gulp.dest(DEST))
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST));
});

gulp.task('compileSpacers', function() {
    return gulp.src(['sass/_variables.scss', 'sass/_spacers.scss'])
        .pipe(concat('toolkit-spacers.scss'))
        .pipe(sass(sassOptions))
        .pipe(gulp.dest(DEST))
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(DEST));
});

gulp.task('default', ['clean', 'compileFull', 'compileSpacers']);

gulp.task('watch', ['default'], function() {
    gulp.watch('sass/**/*.scss', ['default']);
});
