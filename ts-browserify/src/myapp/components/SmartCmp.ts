import { myapp } from "../myapp";
import { NameSvc } from "../services/NameSvc";

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
    template: ` <div>
                   <hr>
                    Smart comp: <input ng-model="$ctrl.comp">
                    <hr>
                    <hello-world prefix="Hello Smart" name="$ctrl.comp" on-changed="$ctrl.update($event)"></hello-world>
                </div>`
}

myapp.component("smartCmp", smartCmp);