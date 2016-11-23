var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
//var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');

var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

//var jshint = require('gulp-jshint');
//var glob = require('glob');
//var plumber = require('plumber');
//var transform = require('vinyl-transform');

var debug=true;
var production=false;
var commonPaths = ['./','./js/src/','./node_modules'];

gulp.task('common', () => {
console.log('transpiling...')
    var b= browserify({
        entries: ['./index.js'],
        debug: debug,
        paths: commonPaths
    })
        .transform('babelify')
        .transform(reactify)
        .bundle().on('error',err)
        .pipe(source('index.js'))
        .pipe(buffer())
    //.pipe(gulpif(production,uglify()))
    //.pipe(gulp.dest('js'));

    var result = b.pipe(gulp.dest('public/'));
    if(production)result.pipe(uglify()).pipe(gulp.dest('js/react'));
    return result;
});

gulp.task('watch',()=>{
    gulp.watch(['./*.js','./**/*.js','./**/**/*.js'], ['common']);
})
function err(e){
    console.log(e.lineNumber,e.message);
    this.emit('end');
}
gulp.task('default',['common','watch'])