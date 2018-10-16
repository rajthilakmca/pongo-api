"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getResponse_1 = require("./getResponse");
const originalFetch = (() => {
    if (typeof window !== 'undefined') {
        return window.fetch.bind(window);
    }
    else if (typeof self !== 'undefined') {
        return self.fetch.bind(self);
    }
    else if (typeof exports === 'object' && typeof module !== 'undefined') {
        return require('node-fetch');
    }
    else {
        throw new Error('Your environment is not defined');
    }
})();
exports.mockableFetch = (() => {
    let usedFetch = originalFetch;
    return {
        fetch(input) {
            if (!usedFetch)
                throw new Error('Fetch is not mocked');
            return usedFetch(input);
        },
        mockWith(func) {
            if (typeof func !== 'function')
                throw new Error('Fetch must be a function');
            usedFetch = func;
        },
        replyWith(data) {
            usedFetch = () => Promise.resolve(new getResponse_1.default(data));
        },
        useOriginal() {
            usedFetch = originalFetch;
        }
    };
})();
if (typeof window !== 'undefined') {
    window.fetch = exports.mockableFetch.fetch;
}
else if (typeof self !== 'undefined') {
    self.fetch = exports.mockableFetch.fetch;
}
else if (typeof exports === 'object' && typeof module !== 'undefined') {
    const mock = require('mock-require');
    mock('node-fetch', exports.mockableFetch.fetch);
}
else {
    throw new Error('Your environment is not defined');
}
//# sourceMappingURL=mockableFetch.js.map