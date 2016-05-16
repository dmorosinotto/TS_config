// 1st import declare module, other attach comp / ctrl / svc to it and then export name
import { myapp } from "./myapp"; // first import define module
import "./components/GreetingCmp"; // other attach components 
import "./components/SmartCmp"; // (internally use import myapp)
import "./services/NameSvc"; // to attach services
import "./controllers/MainCtrl"; // and controller
export default myapp.name // finally export module name
