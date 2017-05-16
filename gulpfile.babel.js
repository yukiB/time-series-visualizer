import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import gutil from 'gulp-util'
import babelify from 'babelify'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cssnext from 'postcss-cssnext'
import sourcemaps from 'gulp-sourcemaps'

const dependencies = [
	'react',
  	'react-dom'
];
let scriptsCount = 0;

const paths = {
    'css': 'static/css/',
    'scss': 'app/scss/',
    'jsx': 'app/jsx/',
    'js': 'static/scripts/js/'
}

gulp.task('browser-sync', () =>
  browserSync({
    proxy: {
      target: 'http://localhost:3000'
    },
    port: 3001
  }))

gulp.task('scss', function() {
  var processors = [
      cssnext()
  ];
  return gulp.src(paths.scss + '**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: require('node-reset-scss').includePath
    }))
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('scripts', () =>
          bundleApp(false))

gulp.task('deploy', () =>
	      bundleApp(true))

gulp.task('watch',  () => {
	gulp.watch([paths.scss + '**/*.scss'], ['scss']);
	gulp.watch([paths.jsx + '**/*.js'], ['scripts']);
	gulp.watch(['./templates/**/*.html'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch', 'browser-sync', 'scss']);

function bundleApp(isProduction) {
	scriptsCount++;
	var appBundler = browserify({
    	entries: paths.jsx + 'app.js',
    	debug: true
  	})

  	if (!isProduction && scriptsCount === 1){
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest(paths.js));
  	}
  	if (!isProduction){
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

  	appBundler
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest(paths.js))
        .pipe(browserSync.reload({stream: true}));
}
