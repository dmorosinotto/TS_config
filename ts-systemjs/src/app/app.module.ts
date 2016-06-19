// import * as angular from "angular"; // //TODO: INVESTIGATE HOW TO INCLUDE angular IN systemjs.config.js 
//TO LOAD IT AS GLOBAL AND AVOID <script> in index.html OR FIND A WAY TO INCLUDE IT IN A SEPARATE VENDOR BUNDLE...
import { provide } from "ng-metadata/core";

import { AppCmp } from "./components/my-app.component";
import { AskCmp } from "./components/ask.component";
import { QuestionSvc } from "./services/question.service";
import myapp from "../myapp/index";

// return/export the module so you can later bootsrap it in the startup using ngMetadata
// define  'app'   module and register all  components  and  services  defined in other files imported above...
export const AppModule = angular.module( "app", [ myapp ] )
  .directive( ...provide( AppCmp ) )
  .directive( ...provide( AskCmp ) )
  .service( ...provide( QuestionSvc ) )
  .name
;
