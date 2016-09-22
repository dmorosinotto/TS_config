//IMPORT ALL VENDOR CODE WITHIN THE BUNDLE -- REMOVE <script> FROM HEAD OF index.html
import jquery from "jquery";
import angular from "angular";
import lodash from "lodash";
//EXPORT GLOBALS TO CORRECTLY EXPOSE IT EVEN IF MODULES ARE INCLUDED IN BUNDLE
window.$ = jquery;
window._ = lodash;
window.angular = angular;