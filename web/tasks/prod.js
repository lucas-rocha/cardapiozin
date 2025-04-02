require('@babel/register')({
  presets: ['@babel/preset-env']
});

const path = require('path')
const { task, src, dest, parallel } = require('gulp')
const cleanCSS = require('gulp-clean-css')
const killPort = require('kill-port')
const imagemin = require('gulp-imagemin')
const babelify = require('babelify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')

const paths = {
  js: {
    src: path.join(__dirname, '../src/public/js/bundle.js'),
    dest: path.join(__dirname, '../dist/public/js/')
  }
};

const styles = () => {
  return src('./src/public/css/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('./dist/public/css'))
}

const images = () => {
  return src('./src/public/images/**/*')
    .pipe(imagemin())
    .pipe(dest('./dist/public/images'))
}

const scripts = () => {
  return browserify({ entries: paths.js.src, debug: true })
    .transform(babelify.configure({
      presets: ['@babel/preset-env'] 
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest(paths.js.dest))
}



task('prod', parallel(styles, images, scripts))