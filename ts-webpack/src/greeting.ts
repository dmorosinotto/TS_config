import { add } from "./util";

export class Greeting {
    private el: HTMLElement;
    constructor(el?: HTMLElement, private prefix: string = 'ciao') {
        this.el = el || document.body;
    }
    
    greet(x) {
        var t = document.createTextNode( add(this.prefix, x) )
        this.el.appendChild( t );
    }
}