// import "reflect-metadata"; //TODO: INVESTIGATE HOW TO INCLUDE reflect-metadata IN systemjs.config.js 
//TO LOAD IT AS GLOBAL AND AVOID <script> in index.html OR FIND A WAY TO INCLUDE IT IN A SEPARATE VENDOR BUNDLE...

// main entry point 
import { bootstrap } from "ng-metadata/platform";
import { enableProdMode } from "ng-metadata/core";
import { AppModule } from "./app.module";

/*
if (process.env.ENV == "production") {
    enableProdMode();
}
*/

// that boostrap the app.module
bootstrap(AppModule);
