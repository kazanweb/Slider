let gulp = require('gulp');
let less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
	return gulp.src('less/style.less')
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(gulp.dest('css/'));
});