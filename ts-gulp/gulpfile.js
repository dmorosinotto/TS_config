// MORE INFO https://www.typescriptlang.org/docs/handbook/gulp.html
var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");


// GLOBAL CONFIG READ FROM tsconfig.json
var TSCONFIG = mergeDeep({
    "compilerOptions": {
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "rootDir": "./",
        "outDir": "dist",
        "outFile": "bundle.js"
    },
    "files": [ "src/main.ts" ]
}, require("./tsconfig.json"));
var PATH = {
    pages: ["src/*.html", "src/*.css", "src/*.jpg"],
};

// HELPER FUNCTION TO COMPILE TYPESCRIPT WITH Browserify + Tsify
function compileTS() {
    return browserify({
        basedir: TSCONFIG.compilerOptions.rootDir,
        debug: TSCONFIG.compilerOptions.sourceMap,
        entries: TSCONFIG.files,
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
}

function bundleJS() {
    return compileTS()
        .bundle()
        .pipe(source(TSCONFIG.compilerOptions.outFile))
}

// DEFINE GULP TASKS
gulp.task("copy:dist", function () {
    return gulp.src(PATH.pages)
            .pipe(gulp.dest(TSCONFIG.compilerOptions.outDir));
});

gulp.task("default", ["copy:dist"], function () {
    return compileTS()
            .bundle()
            .pipe(source(TSCONFIG.compilerOptions.outFile))
            .pipe(gulp.dest(TSCONFIG.compilerOptions.outDir));
});

gulp.task("watch", ["copy:dist"], function(){
    var watchify = require("watchify");
    var gutil = require("gulp-util");
    
    var watching = watchify(compileTS())
    function rebundle() {
        return watching.bundle()
                .pipe(source(TSCONFIG.compilerOptions.outFile))
                .pipe(gulp.dest(TSCONFIG.compilerOptions.outDir));
    }
    watching.on("update", rebundle);
    watching.on("log", gutil.log);
    return rebundle();
});

gulp.task("prod", ["copy:dist"], function () {
    var uglify = require('gulp-uglify');
    var buffer = require('vinyl-buffer');
    var sourcemaps = require('gulp-sourcemaps');
    
    return ((TSCONFIG.compilerOptions.sourceMap) 
            ? bundleJS() // UGLIFY + KEEP SOURCEMAP
                .pipe(buffer())
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write(TSCONFIG.compilerOptions.rootDir))
            : bundleJS() // UGLIFY WITHOUT SOURCEMAP
                .pipe(uglify())
           ).pipe(gulp.dest(TSCONFIG.compilerOptions.outDir));
});

/*
gulp.task("base", function () {
    var ts = require("gulp-typescript");
    var tsProject = ts.createProject("tsconfig.json");
    return tsProject.src()
        .pipe(ts(tsProject))
        .js.pipe(gulp.dest("dist"));
});
*/


// MERGE DEEP HELPERS
function mergeDeep(target, source) {
  var output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(output, { [key]: {} });
        output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
}
