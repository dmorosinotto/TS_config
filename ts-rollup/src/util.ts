import init from "./util_init";

export function add(...args) {
    return args.reduce( (s,i) => s+i , init);
}

export function neverUsed() {
    alert("TREESHAKE WILL REMOVE ME FROM BUNDLE");
}