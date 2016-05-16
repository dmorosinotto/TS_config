import * as angular from "angular";

// define module and attach constants + eventually config / run
export let myapp = angular.module("myapp", [])
    .constant("WAIT",3000);