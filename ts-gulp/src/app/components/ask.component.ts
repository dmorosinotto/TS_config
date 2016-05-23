import {Component, Input, Output, OnInit, EventEmitter } from "ng-metadata/core";
import template from "./ask.component.html"; //TRICK CREATO FILE .html.ts CON DENTRO export default `...`

// INCLUDE CSS IN BUNDLE AND DYNAMICALLY LOAD IT TO HEAD STYLES WHEN RUN THIS
const mycss = require("fs").readFileSync(__dirname + "/../styles.css", "utf-8");
require("insert-css")(mycss);

@Component({
    selector: "ask",
    template
})
export class AskCmp implements OnInit {
    @Input("@") public question: string; // specify input with '@' binding (interpolate)
    @Output() public onResponse: EventEmitter<string>; // specify output default '&' binding

    ngOnInit() { // implement life-cycle hook to initialize component
        console.info("Initialize ASK component");
        console.assert(!!this.question, "question not setted!");
        console.assert(!!this.onResponse, "onResponse handle not setted!");
    }

    protected response: string;
    protected answer() {
        if (this.response && this.response.trim() !== "") {
            this.onResponse.emit( this.response );
        }
    }
}

