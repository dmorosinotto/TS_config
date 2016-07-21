namespace MyApp.Controllers {
    class BaseCtrl { /* SAMPLE BASECLASS DON'T DO $inject HERE! */
        public title: string;
        constructor(public svc: Services.NameSvc) {
            this.title = "Hello ";
            svc.getName().then(t => this.title=t.value+" ");
        }
    }


    export class MainCtrl extends BaseCtrl {
        static $inject = ["NameSvc"]; // USE $inject HERE IN SUBCLASS AND PASS SVC TO super()
        constructor(svc: Services.NameSvc) {
            super(svc);
            this.name = 'World...';
            svc.getName().then( n => this.name = n.value );
        }
        
        public name: string
        public show($event: string | any) {
            if (typeof $event === "string") {
                if (window.confirm("Set " + $event + "?")) this.name = $event;
            } else window.alert(JSON.stringify($event));
        }
    }
}