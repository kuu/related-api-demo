const path = require('path');
const config = require('config');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');

const $ = gulpLoadPlugins();
const bSync = browserSync.create();

/**
 * Security Check
 */
gulp.task('nsp', cb => {
  $.nsp({
    package: path.join(__dirname, 'package.json'),
    stopOnError: false
  }, cb);
});

/**
 * Convert LESS -> CSS
 */
gulp.task('styles', () => {
  return gulp.src('./src/frontend/styles/main.less')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.cssnano({safe: true, autoprefixer: false}))
    .pipe($.rename('app.css'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dist/styles'))
    .pipe(bSync.reload({stream: true}));
});

/**
 * Optimize images
 */
gulp.task('images', () => {
  return gulp.src('./src/frontend/images/**/*')
    .pipe($.plumber())
    .pipe($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .pipe(gulp.dest('./dist/images'))
    .pipe(bSync.reload({stream: true}));
});

/**
 * Compile
 */
// gulp.task('compile', ['styles', 'scripts', 'html', 'images', 'fonts', 'extras'], () => {
gulp.task('compile', ['styles', 'images'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

/**
 * Build
 */
gulp.task('build', ['nsp'], () => {
  gulp.start('compile');
});

/**
 * Clean
 */
gulp.task('clean', del.bind(null, ['dist']));

/**
 * Clean and Build
 */
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

/**
 * Run
 */
gulp.task('watch', ['build'], () => {
  // Start server
  $.nodemon({
    script: './src/',
    ext: 'js html',
    ignore: [
      'node_modules',
      'dist',
      'gulpfile.js'
    ],
    env: {
      NODE_ENV: 'development'
    },
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', chunk => {
      if (/^Listening on/.test(chunk)) {
        // Open browser
        bSync.init({
          notify: false,
          port: 9000,
          proxy: `http://${config.server.host}:${config.server.port}`,
          serveStatic: ['dist']
        }, () => {});
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  }).on('error', err => {
    console.error(`${err.message} ${err.stack()}`);
  });
});
