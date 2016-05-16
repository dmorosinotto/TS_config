import { myapp } from "../myapp"
import { NameSvc } from "../services/NameSvc";

export class MainCtrl {
    static $inject = ["NameSvc"];
    constructor(private svc: NameSvc) {
        this.name = 'World...';
        svc.getName().then( n => this.name = n );
    }
    
    public name: string
    public show($event) {
        window.alert($event);
    }
}

myapp.controller("MainCtrl", MainCtrl);