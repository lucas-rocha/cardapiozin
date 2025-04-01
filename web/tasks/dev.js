require('@babel/register')({
  presets: ['@babel/preset-env']
});

const path = require('path')
const { src, dest, task, series, parallel, watch } = require("gulp")
const shell = require("gulp-shell")
const killPort = require('kill-port')
const babelify = require('babelify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')

const sass = require('gulp-sass')(require('sass'))
sass.compiler = require('sass')

const runTSNodeDev = async () => {
  killPort(4000)
  shell.task(['ts-node-dev --respawn --transpile-only src/index.ts'])();
} 
const paths = {
  js: {
    src: path.join(__dirname, '../src/public/js-src/main.js'),  // Caminho absoluto para o arquivo de entrada
    dest: path.join(__dirname, '../src/public/js/')        // Caminho absoluto para o diretório de saída
  }
};
const styles = () => {
  return src('./src/public/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/public/css'))
}

const scripts = () => {
  return browserify(paths.js.src , { debug: true })
    .transform(babelify.configure({
      presets: ['@babel/preset-env'] 
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest(paths.js.dest))
}

const watchTasks = () => {
  watch('./src/public/scss/**/*.scss', series(styles, runTSNodeDev))
  watch('./src/public/js-src/**/*.js', scripts);
  // watch('./src/**/*.ts', runTSNodeDev);
}

task('dev', series(
    parallel(styles, scripts),
    watchTasks
  )
)