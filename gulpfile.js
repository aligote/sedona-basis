'use strict';


// Packages
//------------------------------------------------------------------------------

const gulp = require('gulp');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const csscomb = require('gulp-csscomb');
const fileinclude = require('gulp-file-include');
const multipipe = require('multipipe');
const browserSync = require('browser-sync').create();
const gulpsync = require('gulp-sync')(gulp);
const typograf = require('gulp-typograf');
const gulpHtmlVersion = require('gulp-html-version');


// Paths
//------------------------------------------------------------------------------

const paths = {
	build: 'build/',
	dist: {
		base: 'dist/',
		img: 'dist/img/',
		css: 'dist/css/',
		js: 'dist/js/'
	},
	src: {
		base: [
			'src/*.*'
		],
		html: [
			'src/*.html'
		],
		img: [
			'src/img/**/*.{jpg,png,svg}'
		],
		css: {
			libs: [
				'node_modules/normalize.css/normalize.css'
			],
			main: [
				'node_modules/sedona-blocks/src/global/global.less',
				'node_modules/sedona-blocks/src/scene/scene.less',
				'node_modules/sedona-blocks/src/wysiwyg/wysiwyg.less',
				'node_modules/sedona-blocks/src/grid/grid.less',
				'src/less/main.less'
			]
		},
		js: {
			libs: [],
			app: [
				'node_modules/sedona-blocks/src/global/global.js',
				'src/js/app.js'
			]
		}
	},
	watch: {
		html: [
			'src/blocks/**/*.html',
			'src/inc/*.html',
			'src/*.html'
		],
		css: [
			'src/blocks/**/*.less',
			'src/less/*.less'
		],
		js: [
			'src/blocks/**/*.js',
			'src/js/*.js'
		]
	}
};


// Dist
//------------------------------------------------------------------------------

gulp.task('base', function() {
	return multipipe(
		gulp.src(paths.src.base),
		gulp.dest(paths.dist.base)
	);
});

gulp.task('html', function() {
	return multipipe(
		gulp.src(paths.src.html),
		fileinclude(),
		gulpHtmlVersion({
			paramType: 'timestamp',
			suffix: ['css', 'js', 'jpg', 'png', 'svg']
		}),
		typograf({
			locale: ['ru', 'en-US'],
			htmlEntity: {
				type: 'name'
			},
			enableRule: ['common/nbsp/afterNumber'],
			disableRule: ['common/space/replaceTab'],
			processingSeparateParts: false
		}),
		gulp.dest(paths.dist.base),
		browserSync.stream()
	);
});

gulp.task('img', function() {
	return multipipe(
		gulp.src(paths.src.img),
		gulp.dest(paths.dist.img)
	);
});

gulp.task('css:libs', function() {
	return multipipe(
		gulp.src(paths.src.css.libs),
		concat('libs.min.css'),
		csso({
			restructure: false
		}),
		gulp.dest(paths.dist.css)
	);
});

gulp.task('css:main', function() {
	return multipipe(
		gulp.src(paths.src.css.main),
		concat('main.min.css'),
		less(),
		autoprefixer(),
		csscomb(),
		csso(),
		gulp.dest(paths.dist.css),
		browserSync.stream()
	);
});

gulp.task('js:libs', function() {
	return multipipe(
		gulp.src(paths.src.js.libs),
		concat('libs.min.js'),
		uglify({
			mangle: false
		}),
		gulp.dest(paths.dist.js)
	);
});

gulp.task('js:app', function() {
	return multipipe(
		gulp.src(paths.src.js.app),
		fileinclude(),
		concat('app.min.js'),
		uglify(),
		gulp.dest(paths.dist.js),
		browserSync.stream()
	);
});


// Build
//------------------------------------------------------------------------------

gulp.task('build', ['clean:build', 'default'], function() {
	return multipipe(
		gulp.src(paths.dist.base + '**'),
		gulp.dest(paths.build)
	);
});


// Watch
//------------------------------------------------------------------------------

gulp.task('watch', ['default'], function() {
	browserSync.init({
		server: {
			baseDir: paths.dist.base
		},
		notify: false
	});

	gulp.watch(paths.watch.html, ['html']);
	gulp.watch(paths.watch.css, ['css:main']);
	gulp.watch(paths.watch.js, ['js:app']);
});


// Clean
//------------------------------------------------------------------------------

gulp.task('clean:dist', function() {
	return del.sync(['dist/**', '!dist']);
});

gulp.task('clean:build', function() {
	return del.sync(['build/**', '!build']);
});


// Default
//------------------------------------------------------------------------------

gulp.task('default', gulpsync.sync(['clean:dist', 'base', 'html', 'img', 'css:libs', 'css:main', 'js:libs', 'js:app']));
