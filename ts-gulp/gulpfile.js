// MORE INFO https://www.typescriptlang.org/docs/handbook/gulp.html
// var gulp = require("gulp");
var gulp = require('gulp-param')(require('gulp'), process.argv);
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var path = require("path");



// GLOBALS VARIBALE ALL SETTED IN initTSCONFIG MERGING STANDARD CONFIG WITH tsconfig.json PASSED AS ARGS
var TSCONFIG; // CONFIG READ FROM tsconfig.json PASSED AS ARGS OR READED FROM projdir
var BASEDIR; // BASE DIRECTORY THAT CONTAINS tsconfig.json AND ALL PATH ARE RELATIVE TO THIS
var DESTDIR; // DESTINATION DIRECTORY (=TSCONFIG.compilerOptions.outDir)
var BUNDLEFILE; // BUNDLE DESTINATON FILE (=TSCONFIG.compilerOptions.outFile)
var PATH = {
    copy: [], // LIST OF FILE OR GLOBS TO COPY INTO DEST 
    dest: "" // DESTINATION PATH WHERE PUT COPYIED FILES 
};



// DEFINE GULP TASKS
gulp.task("copy:dist", function () {
    return gulp.src(PATH.copy)
            .pipe(gulp.dest(PATH.dest));
});

gulp.task("default", ["copy:dist"], function (projdir, tsconfig) {
    return compileTS(projdir, tsconfig)
            .bundle()
            .pipe(source(BUNDLEFILE))
            .pipe(gulp.dest(DESTDIR));
});

gulp.task("watch", ["copy:dist"], function(projdir, tsconfig){
    var watchify = require("watchify");
    var gutil = require("gulp-util");
    
    var watching = watchify(compileTS(projdir, tsconfig))
    function rebundle() {
        return watching.bundle()
                .pipe(source(BUNDLEFILE))
                .pipe(gulp.dest(DESTDIR));
    }
    watching.on("update", rebundle);
    watching.on("log", gutil.log);
    return rebundle();
});

gulp.task("prod", ["copy:dist"], function (projdir, tsconfig, sourcemap) {
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    console.log("Production bundle ", (sourcemap)?"INCLUDE":"WITHOUT" , " sourcemap!");
    return ((sourcemap) 
            ? bundleJS(projdir, tsconfig) // UGLIFY + KEEP SOURCEMAP
                .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
                .pipe(sourcemaps.write("./")) 
            : bundleJS(projdir, tsconfig) // UGLIFY WITHOUT SOURCEMAP
                .pipe(uglify())
           ).pipe(gulp.dest(DESTDIR));
});



// HELPER FUNCTION TO COMPILE TYPESCRIPT WITH Browserify + Tsify
function compileTS(projdir, tsconfig) {
    initTSCONFIG(projdir, tsconfig);
    return browserify({
        basedir: BASEDIR,
        debug: TSCONFIG.compilerOptions.sourceMap,
        entries: TSCONFIG.files,
        cache: {},
        packageCache: {}
    })
    .plugin(tsify, TSCONFIG.compilerOptions)
    .transform('brfs') //USE BRFS TRASFORM TO INCLUDE HTML/CSS IN BUNDLE require('fs').readFileSync(...)
}

function bundleJS(projdir, tsconfig) {
    var buffer = require('vinyl-buffer');
    return compileTS(projdir, tsconfig)
        .bundle()
        .pipe(source(BUNDLEFILE))
        .pipe(buffer())
}

//HELPER TO READ AND INIT GLOBAL TSCONFIG FROM FILE PASSED AS ARGS
function initTSCONFIG(projdir, tsconfig) {
    if (!tsconfig) {
        projdir = slash(projdir);
        tsconfig = doted(path.join(projdir, "tsconfig.json"));
    } else if (!projdir) {
        projdir = slash(path.relative("",path.resolve(tsconfig, "..")));
        tsconfig = doted(tsconfig);
    } else {
        projdir = slash(projdir);
        tsconfig = path.resolve(projdir, doted(tsconfig));
    }
    console.log("Read tsconfig from: " + tsconfig);
    TSCONFIG = mergeDeep({
        "compilerOptions": {
            "module": "commonjs",
            "moduleResolution": "node",
            "sourceMap": true,
            "rootDir": "./",
            "outDir": "dist",
            "outFile": "bundle.js"
        },
        "files": [ "src/main.ts" ]
    }, require(tsconfig));
    BASEDIR = doted(path.relative("",path.resolve(tsconfig, "..")));
    DESTDIR = doted(path.relative("",path.resolve(tsconfig, "..", TSCONFIG.compilerOptions.outDir)));
    BUNDLEFILE = TSCONFIG.compilerOptions.outFile;
    console.log("Building '" + BUNDLEFILE + "' into '" + DESTDIR + "' based '"+ BASEDIR +"' ...");
}

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

// PATH HELPERS
function slash(dir) {
    if (!dir) return "." + path.sep;
    // MAKE SURE THAT DIR END WITH SEP '/' IF NOT I ADDED IT AT THE END
    return (dir.charAt(dir.length-1) === path.sep) ? dir : dir + path.sep;
}

function doted(dir) {
    if (!dir) return "." + path.sep;
    // MAKE SURE THAT PATH IS RELATIVE AND START WITH './' IF NOT I ADDED IT IN FRONT
    return (dir.charAt(0) === ".") ? dir : "." + path.sep + dir;
}