import { myapp } from "../myapp";

export class NameSvc {
    static $inject = ["$q", "WAIT"];
    constructor(private $q: angular.IQService, private wait: number) {
        this.wait = wait || 1000;
    }   
    
    getName(): angular.IPromise<string> {
        var p = this.$q.defer<string>()
        setTimeout(() => p.resolve("Pippo"), this.wait);
        return p.promise;
    }
}

myapp.service('NameSvc', NameSvc);