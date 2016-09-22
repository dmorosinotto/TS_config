// Rollup plugins to install as npm i --save-dev
// Rollup configuration inspired by https://www.youtube.com/watch?v=ICYLOZuFMz8
import typescript from "rollup-plugin-typescript";//used for typescript compilation
import resolve from "rollup-plugin-node-resolve"; //used for enabel NPM modules +
import commonjs from "rollup-plugin-commonjs";    //with probably use commonjs
import replace from "rollup-plugin-replace";      //used for replacing ENV varible in code 
import uglify from "rollup-plugin-uglify";        //used for production minification
import postcss from "rollup-plugin-postcss";      //used for dynamically inline CSS into HEAD from import "path/to/style.css"; //more info https://www.youtube.com/watch?v=hJ2RVXEIgkk
import string from "rollup-plugin-string";        //used for dynamically include html file and convert to string module to load template 
// import angular from "rollup-plugin-angular";   //used for Angular2 application see https://www.npmjs.com/package/rollup-plugin-angular

export default {
  entry: "src/main.ts", //entrypoint to traverse app
  dest: "dist/bundle.js", //destination file
  format: "iife", //format output wrapping all function into a single IIFE
  sourceMap: true, //produce sourceMap and "inline" or maybe set sourceMap: true, sourceMapFile: 'path/for/dist/bundle.js.map'
  sourceMapFile: "dist/bundle.js.map",
  plugins: [
    string({ 
            include: "**/*.html",
            exclude: ["**/index.html"]
        }),
    postcss({ extensions: [ ".css" ] }),
    typescript({
      //default use tsconfig.json but can be ovverride here 
      //typescript: require('some-typescript-fork') //default use TS 1.8.9 but can use other specific compiler version/fork
    }),
    resolve({ //used to resolve NPM module reading from packages.json those entrypoint (ES6 - Main or Browser specific)
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(), //translate commonjs module to ES6 module to be handle from Rollup and tree-shake
    replace({ //enable find-replacing variable in JS code to use ENV varibale for conditional code 
      ENV: JSON.stringify(process.env.NODE_ENV || "development") // key = var name, value = replace
    }),
    (process.env.NODE_ENV === "production" && uglify())
  ]
}