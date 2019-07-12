// Gulp File v1
const gulp = require('gulp');

// CSS Cleaner
const cleanCSS = require('gulp-clean-css');

// Adding the SASS
const sass = require('gulp-sass');

// JS Minification
const uglify = require('gulp-uglify');
const pump = require('pump');
const babel = require('gulp-babel');
const rename = require("gulp-rename");





// Check that Gulp is working
gulp.task('default', function() {
    console.log('Gulp js is running');
});

// Process the CSS
gulp.task('css', function() {

    // Take all the .scss files
    return gulp.src('src/css/sass/style.scss')
        .pipe(sass())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('public/css'));
});


gulp.task('watch:css', function() {
    gulp.watch('src/css/*.scss', ['css']);
});

gulp.task('watch:html', function() {
    gulp.watch('index.test.html', ['moveHTML']);
});

gulp.task('moveHTML', function() {
    return gulp.src('index.test.html')
        .pipe(gulp.dest('public'));
});

// gulp.task('js', function() {
//     return gulp.src('src/js/boa.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('public/js'));
// });


gulp.task('jsUglify', ['jsToEs5'], function(cb) {
    pump([
            gulp.src('public/js/*.js'),
            uglify(),
            gulp.dest('public/js')
        ],
        cb
    );
});

gulp.task('watch:js', function() {
    gulp.watch('src/js/*.js', ['jsUglify']);
});

gulp.task('jsToEs5', function() {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/js'));
});


// gulp.task('serve', ['watch:css', 'watch:html', 'watch:js'], function() {
//     return gulp.src('public')
//         .pipe(webserver({
//             port: 3000,
//             livereload: true,
//             fallback: 'index.test.html'
//         }));
// });