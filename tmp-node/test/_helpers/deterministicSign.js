"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axlsign_1 = require("../../src/libs/axlsign");
const base58_1 = require("../../src/libs/base58");
const constants = require("../../src/constants");
function deterministicSign(dataBytes, privateKey) {
    if (!dataBytes || !(dataBytes instanceof Uint8Array)) {
        throw new Error('Missing or invalid data');
    }
    if (!privateKey || typeof privateKey !== 'string') {
        throw new Error('Missing or invalid private key');
    }
    const privateKeyBytes = base58_1.default.decode(privateKey);
    if (privateKeyBytes.length !== constants.PRIVATE_KEY_LENGTH) {
        throw new Error('Invalid public key');
    }
    // Intentionally drop random values to make it deterministic
    const signature = axlsign_1.default.sign(privateKeyBytes, dataBytes);
    return base58_1.default.encode(signature);
}
exports.deterministicSign = deterministicSign;
//# sourceMappingURL=deterministicSign.js.map