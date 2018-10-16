"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response = (function () {
    if (typeof window !== 'undefined') {
        return window.Response.bind(window);
    }
    else if (typeof self !== 'undefined') {
        return self.Response.bind(self);
    }
    else if (typeof exports === 'object' && typeof module !== 'undefined') {
        return require('node-fetch').Response;
    }
    else {
        throw new Error('Your environment is not defined');
    }
})();
exports.default = Response;
//# sourceMappingURL=getResponse.js.map