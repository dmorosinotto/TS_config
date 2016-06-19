import {Component, Input, Output, OnInit, EventEmitter } from "ng-metadata/core";
//TRICK EMBEDDED html INTO A MODULE FILE .html.ts WITH export default `...<html>...`
import template from "./ask.component.html"; 

//USED BRFS THAT TRASFORM THIS REQUIRE EXTRACTING RELATIVE PATH AND INLINE CSS INTO VARIBALE
const mycss = require("fs").readFileSync(__dirname + "/../styles.css", "utf-8");
require("insert-css")(mycss); //THEN USED INLINE-CSS PLUGIN TO PUT/LOAD INLINED CSS INTO HEAD

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

