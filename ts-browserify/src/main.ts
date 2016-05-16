import { Greeting } from "./greeting";
// import "./myapp"; // old import for classic Angular ng-app="myapp"
import "./app/startup"; // bootstrap angular app using ngMetadata

var init = 123;

var d = new Greeting( document.getElementById("#greeting") );
d.greet("Pippo");

var g = new Greeting( $("#greeting").get(0) )
g.greet("Pluto");

