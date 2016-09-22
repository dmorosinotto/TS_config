import { myapp } from "../myapp"

class Greeting{
    public prefix: string;
    public name: string;
    public onChanged: Function;
    
    static $inject = ["$log"]
    constructor(private log: angular.ILogService) {
        log.warn("on ctor NOT READY:", this.prefix, this.name, this.onChanged);
    }
    
    $onInit() {
        this.log.info("$onInit life-cycle hook OK:", this.prefix, this.name, this.onChanged);
    }
    
    notify() {
        this.log.log("notify $event->",this.name);
        this.onChanged({$event: this.name });
    }
}

let helloWorld: angular.IComponentOptions = {
    bindings: {
        prefix: "@",
        name: "<",
        onChanged: "&"
    },
    controller: Greeting,
    template: `<div><b>{{$ctrl.prefix || 'Hello'}}</b> <input ng-model="$ctrl.name"> 
                    <button ng-click="$ctrl.notify()">OK</button> </div>`
}

myapp.component("helloWorld", helloWorld);