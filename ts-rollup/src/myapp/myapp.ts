// import * as angular from "angular";  //TODO: INVESTIGATE HOW TO INCLUDE angular IN systemjs.config.js 
//TO LOAD IT AS GLOBAL AND AVOID <script> in index.html OR FIND A WAY TO INCLUDE IT IN A SEPARATE VENDOR BUNDLE...

// define module and attach constants + eventually config / run
export let myapp = angular.module("myapp", [])
    .constant("WAIT",3000);

    