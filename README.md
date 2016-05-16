# TS_config
Typescript seed projects with different config / build tools, 
all sample show some basic [Typescript](http://www.typescriptlang.org/docs/handbook/modules.html) code + 
a basic [Angular 1.x](https://docs.angularjs.org/guide/component) app using components architecture +
a possible migration path to NG2 using [ngMetadata](https://github.com/ngParty/ng-metadata/blob/master/docs/DESIGN-PATTERNS.md)

- **[namespace](ts-namespace)** sample using Typescript namespace + TSC with outFile to bundle
- **[browserify](ts-browserify)** sample using Typescript commonjs module + Browserify + Tsify to build the bundle
- **[gulp](ts-gulp)** sample using Typescript import/export module + bundle built with Gulp (watchify + uglify for prod)
- **[webpack](ts-webpack)** sample using Typescript import/export module + Webpack to build vendor and app bundle


To try a sample simply: 
```
cd  ts-<config_directory>
npm install
npm start
```