import { Component, Inject } from "ng-metadata/core";
import { QuestionSvc } from "../services/question.service";

//USED BRFS THAT TRASFORM THIS REQUIRE EXTRACTING RELATIVE PATH AND INLINE HTML INTO VARIBALE
const myhtml = require("fs").readFileSync(__dirname + "/./my-app.component.html", "utf-8");

@Component({
    selector: "my-app",
    template: myhtml
})
export class AppCmp {
    constructor( // inject dependency into constructor
    // for basic factories (like angular 1.x) you must explict @Inject with string token
        @Inject("$window") private win: angular.IWindowService,
    // for services defined as TS class decorated with @Injectable you can leverage TS reflect-metadata by Type without explicit @Inject
        qs: QuestionSvc
    ) {
        this.title = "ngMetadata";
        qs.getQuestions().then(q => this.question = q );
    }

    // property exposed to template via $ctrl (controllerAs default alias)
    public title: string;
    public question: string;
    // method exposed to template via $ctrl (controllerAs default alias)
    public show(response) {
        this.win.alert(`Thanks for your response:\n${response}!`);
    }

}
