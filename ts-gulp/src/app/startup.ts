// import "reflect-metadata"; // deccoment to include in the bundle e define globally - so you can remove script in index.html

// main entry point 
import {bootstrap} from "ng-metadata/platform";
import {AppModule} from "./app.module";

// that boostrap the app.module
bootstrap(AppModule);
