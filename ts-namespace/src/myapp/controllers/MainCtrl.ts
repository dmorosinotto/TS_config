namespace MyApp.Controllers {
    export class MainCtrl {
        static $inject = ["NameSvc"];
        constructor(private svc: Services.NameSvc) {
            this.name = 'World...';
            svc.getName().then( n => this.name = n );
        }
        
        public name: string
        public show($event) {
            window.alert($event);
        }
    }
}