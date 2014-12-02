var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');

var paths = {
    lib: [
        'lib/angular/angular.js',
        'lib/angular/angular-messages.js',
        'lib/firebase/firebase.js',
        'lib/firebase/angularfire.js'
    ],
    app: [
        'app/app.js',
        'app/**/*.js'
    ],
    style: './public/style.scss',
    templates: [
        'app/*.html'
    ]
};

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('lib', ['clean'], function() {
    return gulp.src(paths.lib)
        //.pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat('lib.min.js'))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('app', ['clean'], function() {
    return gulp.src(paths.app)
        //.pipe(sourcemaps.init())
            .pipe(uglify({ mangle: false }))
            .pipe(concat('app.min.js'))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('templates', function () {
    gulp.src(paths.templates)
        .pipe(templateCache({ module: 'leanMetrix' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(paths.lib, ['lib']);
    gulp.watch(paths.app, ['app']);
});

gulp.task('default', ['lib', 'app', 'templates']);
