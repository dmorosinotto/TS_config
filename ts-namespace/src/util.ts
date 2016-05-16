/// <reference path="util_init.ts" />

namespace util {
    export function add(...args) {
        return args.reduce( (s,i) => s+i , init);
    }
}