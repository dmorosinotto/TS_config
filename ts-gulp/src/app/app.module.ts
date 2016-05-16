// import * as angular from "angular"; // deccoment to include in the bundle and define angular globally - so you can remove script in index.html
import { provide } from "ng-metadata/core";

import { AppCmp } from "./components/my-app.component";
import { AskCmp } from "./components/ask.component";
import { QuestionSvc } from "./services/question.service";
import myapp from "../myapp"

// return/export the module so you can later bootsrap it in the startup using ngMetadata
// define  'app'   module and register all  components  and  services  defined in other files imported above...
export const AppModule = angular.module( "app", [ myapp ] )
  .directive( ...provide( AppCmp ) )
  .directive( ...provide( AskCmp ) )
  .service( ...provide( QuestionSvc ) )
  .name
;
