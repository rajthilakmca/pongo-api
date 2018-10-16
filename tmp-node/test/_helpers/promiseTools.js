"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function waterfall(array) {
    let promise = Promise.resolve();
    for (let func of array) {
        promise = promise.then(func);
    }
    return promise;
}
exports.waterfall = waterfall;
//# sourceMappingURL=promiseTools.js.map