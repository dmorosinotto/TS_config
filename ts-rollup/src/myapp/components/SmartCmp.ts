import { myapp } from "../myapp";
import { NameSvc } from "../services/NameSvc";

import template from "./SmartCmp.html"; //INLINE TEMPLATE AS STRING MODULE READ FROM rollup-plugin-string

class SmartCmp {
   static $inject = ["NameSvc"];
    constructor(private svc: NameSvc) {
        this.comp = 'Component...';
        svc.getName().then( n => this.comp = n );
    }
    
    public comp: string
    public update($event) {
        window.alert("Update SMART: " + $event);
        this.comp = $event;
    }
}

let smartCmp: angular.IComponentOptions = {
    controller: SmartCmp,
    template //INLINE FROM MODULE IMPORT USING rollup-plugin-string
}

myapp.component("smartCmp", smartCmp);