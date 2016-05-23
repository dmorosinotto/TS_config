// MINIMAL DEFINITION FOR REQUIRE / NODE MODULES / BROWSERIFY / BRFS 
declare var __dirname: string;
declare var __filename: string;
declare var require: RequireFn;
declare var module: NodeModule;
interface RequireFn {
    (id: string): any
}
interface NodeModule {
    id: any;
    require: RequireFn;
    exports: any;
}
interface NodeCallback {
    (err: any, data:any):any
}
declare module "fs" {
    export function readFileSync(pathExpr: string, enc?: string): string;
    export function readFile(pathExpr: string, enc: string, cb: NodeCallback): void;
    export function readdirSync(pathExpr: string): string;
    export function readdir(pathExpr:string, cb:NodeCallback): void;
}