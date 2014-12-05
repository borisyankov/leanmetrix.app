var gulp = require('gulp');
var concat = require('gulp-concat');
//var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

var paths = {
    dest: '../leanmetrix.com',
    html: 'index.html',
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
    style: 'style/*.css',
    templates: [
        '!app/index.html',
        'app/**/*.html'
    ]
};

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

gulp.task('html', ['clean'], function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(paths.dest));
});

gulp.task('style', ['clean'], function() {
    return gulp.src(paths.style)
        //.pipe(sourcemaps.init())
        //    .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('lib', ['clean'], function() {
    return gulp.src(paths.lib)
        .pipe(sourcemaps.init())
            //.pipe(uglify())
            .pipe(concat('lib.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('app', ['clean'], function() {
    return gulp.src(paths.app)
        .pipe(sourcemaps.init())
            //.pipe(uglify({ mangle: false }))
            .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('templates', ['clean'], function () {
    return gulp.src(paths.templates)
        .pipe(templateCache({ module: 'leanMetrix' }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
    gulp.watch(paths.style, ['style']);
    gulp.watch(paths.lib, ['lib']);
    gulp.watch(paths.app, ['app']);
});

gulp.task('default', ['html', 'style', 'lib', 'app', 'templates']);
