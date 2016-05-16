// import "reflect-metadata"; // deccoment to include in the bundle e define globally - so you can remove script in index.html

import "./app.style.css"; // LOAD CSS WITH WEBPACK DON'T WORKS RIGHT NOW...

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
