// Simple declaration for jquery and lodash... better include those using typings
// RUN> typings install jquery lodash angular --save --ambient 
// declare var $ : any;
// declare var _ : any;

// Pro Typescript Tips to validate dynamic load/include of template as module
// https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#wildcard-character-in-module-names
declare module "*.html";