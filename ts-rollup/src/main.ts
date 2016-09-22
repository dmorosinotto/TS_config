// HANDLE VENDOR GLOBALS: angular, $ = jquery, _ = lodash 
// if you comment the above line, you MUST include single <script> in the <head> of the index.html
// import "./vendor"; // uncomment this line to include all vendor: Angular, Jquery, Lodash in the bundle!

import "./app/app.style.css"; // INCLUDE STYLE IN BUNDLE USING POSTCSS TO DINAMICALLY INSERT INTO HEAD STYLES AT RUNTIME


import { Greeting } from "./greeting";
// NG-METADATA APP ACTUALLY NOT WORKING FOR __export PROBLEM (transpile of export * from "...";)
// import "./app/startup"; // bootstrap angular app using ngMetadata --> loading app/AppModule (ngMetadata) and --> myapp (old Angular)
import myapp from  "./myapp/index"; // old import for classic Angular WARN: <ng-app="myapp"> NOT WORKING becouse module defined too late
angular.bootstrap(document, [myapp]); // so decomment even this line to manual bootstrap angular to load "myapp" or you get inject error

/* 
// SAMPLE USING OBSERVABLE TO SHOW AUTOMATIC TREESHAKING NOTUSED CODE bundle.js
import {Observable} from "rxjs/Observable"; //import {Observable} from "rxjs"
import "rxjs/add/observable/of";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import "rxjs/add/operator/switchmap";
*/

var init = [123];

var d = new Greeting( document.getElementById("greeting") );
d.greet("Pippo");

var g = new Greeting( $("#greeting").get(0) )
g.greet("Pluto");

console.info("LODASH WORKING?", init, _.isArray(init) );

/* 
// SAMPLE USING OBSERVABLE TO SHOW AUTOMATIC TREESHAKING NOTUSED CODE bundle.js
// Observable.of(0,1,2,3,4,5,6,7,8,9,10,11);
Observable.interval(1000)
    .take(10) // try comment this or above line to see change in bundle (tree-shake)
    .switchMap(x => Observable.of(x * 2))
    .subscribe(n => console.log("lodash", "X","rxjs sec", n));
*/