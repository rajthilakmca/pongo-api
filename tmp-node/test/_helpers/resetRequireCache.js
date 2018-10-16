"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO : resolve real path to avoid overlaps
function resolveName(name, object) {
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].indexOf(name) !== -1) {
            return keys[i];
        }
    }
}
function default_1(...names) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        names.forEach((name) => {
            name = resolveName(names, require.cache);
            delete require.cache[name];
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=resetRequireCache.js.map