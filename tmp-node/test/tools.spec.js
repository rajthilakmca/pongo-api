"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChai_1 = require("./_helpers/getChai");
const WavesAPI = require("../dist/waves-api.min");
let Waves;
describe('tools', function () {
    beforeEach(() => {
        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
    });
    it('should build the right address from the given public key', () => {
        const publicKey = 'GL6Cbk3JnD9XiBRK5ntCavSrGGD5JT9pXSRkukcEcaSW';
        const address = '3N1JKsPcQ5x49utR79Maey4tbjssfrn2RYp';
        getChai_1.expect(Waves.tools.getAddressFromPublicKey(publicKey)).to.equal(address);
    });
});
//# sourceMappingURL=tools.spec.js.map