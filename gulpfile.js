var gulp = require('gulp'),
	watch = require('gulp-watch'),
	stylus = require('gulp-stylus'),
	dookie = require('dookie-css');

gulp.task('stylus', function () {
	gulp
		.src('./styl/**/*.styl')
		.pipe(stylus({
			use: dookie.css(),
			//compress: true
		}))
		.pipe(gulp.dest('./css'))
});

gulp.task('watch', function() {
	gulp.watch('./styl/**/*.styl', ['stylus']);
})

gulp.task('default', ['stylus', 'watch'])