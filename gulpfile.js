const { src, dest, series, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const sync = require("browser-sync").create();

function compileScss(cb) {
  src("./scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(dest("css"));
  cb();
}

function minCss(cb) {
  src([
    "node_modules/lightslider/dist/css/lightslider.min.css",
    "./css/style.css",
  ])
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(dest("css/"))
    .pipe(sync.stream());
  cb();
}

function minJs(cb) {
  src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/lightslider/dist/js/lightslider.min.js",
    "js/app.js",
  ])
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(dest("js"));
  cb();
}

function watchFiles(cb) {
  watch("./scss/**/*.scss", series(compileScss, minCss));
}

function browserSync(cb) {
  sync.init({
    server: {
      baseDir: "./",
    },
  });

  watch("scss/**.scss", series(compileScss, minCss));
  watch("**.html").on("change", sync.reload);
}

exports.scss = compileScss;
exports.css = minCss;
exports.js = minJs;
exports.style = series(compileScss, minCss);
exports.watch = browserSync;
exports.default = series(compileScss, minCss, minJs, browserSync);
  