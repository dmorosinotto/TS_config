//READ MORE official docs https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
//COURSE egghead on TS setup https://egghead.io/course/up-and-running-with-typescript lessons: 5 and 9

System.config({
    packages: {
        "dist": { // destination of TS build outDir entrypoint main.ts -> js transpiled from tsc build
            "defaultExtension": "js",
            "main": "main"
        }
        ,"rxjs": { //added this to add .js extension to import rxjs/something --> node_modules/rxjs/something.js
            "defaultExtension": "js" //TODO: IF USING rxjs 5.0.0beta9 you need to map/resolve symbol-observable!
        },
        "ng-metadata": { //even here add .js extension to import ng-metadata/* -> node_modules/ng-metadata/*.js
            "defaultExtension": "js"
        }

    },
    map: { // define here path or where to point to resolve  external/vendor library imported in myapp
        "lodash": "https://unpkg.com/lodash@4.13.1", //load directly on web
        "rxjs": "node_modules/rxjs", //directory to load rxjs relative import --> node_modules
        "ng-metadata": "node_modules/ng-metadata"
    }
    /*
    , meta: {
        "angular": {
            format: "global", // load this module as a global
            exports: "angular", // the global property to take as the module value
        }
    } 
    */
});

// TO RUN THE APP SIMPLY System.import("dist") THE ENTRYPOINT main IS JUST SPECIFIED IN packages UP HERE