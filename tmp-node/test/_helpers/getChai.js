"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let result;
if (typeof chai !== 'undefined') {
    result = chai;
}
else {
    result = require('chai');
}
exports.assert = result.assert;
exports.expect = result.expect;
exports.should = result.should;
//# sourceMappingURL=getChai.js.map