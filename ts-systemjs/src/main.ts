import { Greeting } from "./greeting";
import "./app/startup"; // bootstrap angular app using ngMetadata --> loading app/AppModule (ngMetadata) and --> myapp (old Angular)
// import myapp from  "./myapp/index"; // old import for classic Angular WARN: <ng-app="myapp"> NOT WORKING becouse module defined too late
// angular.bootstrap(document, [myapp]); // so decomment even this line to manual bootstrap angular to load "myapp" or you get inject error

import * as _ from "lodash";

import {Observable} from "rxjs/Observable"; //import {Observable} from "rxjs"
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";


var init = [123];

var d = new Greeting( document.getElementById("#greeting") );
d.greet("Pippo");

var g = new Greeting( $("#greeting").get(0) )
g.greet("Pluto");

Observable.interval(1000)
    .take(10)
    .subscribe(n => console.log("lodash", _.isArray(init) ,"rxjs sec", n));
