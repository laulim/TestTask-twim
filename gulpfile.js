var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync'),
	del = require('del'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	runSequence = require('run-sequence');

gulp.task('less', function(){
	return gulp.src('app/less/*.less')
		.pipe(plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Styles',
					sound: false,
					message: err.message
				}
			})
		}))
		.pipe(less())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'copy:libs'], function() {
	gulp.watch('app/less/**/*.less', ['less']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', function(callback){
	runSequence(
		'clear',
		'watch',
		callback
    )
});