// READ MORE https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
// AND HERE: https://angular.io/docs/ts/latest/guide/webpack.html

var webpack = require("webpack");
// var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
module.exports = {
    entry: {
        bundle: "./src/main.ts",
        vendor: "./src/vendor.ts" 
    },
    output: {
        filename: "./dist/[name].js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".js", ".ts"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/,  loader: "ts-loader" }
           ,{ test: /\.css$/,   loader: "style!css" }
           // ADD THIS MODULES: npm i --save extract-text-webpack-plugin html-loader raw-loader file-loader null-loader
           // ,{ text: /\.html$/,  loader: "html" }
           // ,{ test: /\.css$/,   loader: require("extract-text-webpack-plugin").extract("style","css?sourceMap") }
           // ,{ text: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,  loader: "file?name=asset/[name].[hash].[ext]"  }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["bundle", "vendor"] // separate build in multiple otput
        })
        //, new webpach.optimize.NoErrorsPlugin() // stop build if there is any error
        //, new webpack.optimize.DedupePlugin() // detects identical files and remove from output
        // , new webpack.optimize.UglifyJs() // minifies bundles
        //, new require("extract-text-webpack-plugin")("[name].css") //extract embedded css as external files, adding cache-burst
        //, new webkpack.DefinePlugin({ // used to define enviroment variable
        //    "process.env": { "ENV": JSON.stringify(ENV) }
        //})
    ] 
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    //externals: {
    //    "angular": "angular"
    //},
};


// HELPER ROOT 
var path = require('path');
var _root = path.resolve(__dirname, '..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
