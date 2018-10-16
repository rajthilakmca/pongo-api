"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChai_1 = require("../_helpers/getChai");
const WavesAPI = require("../../dist/waves-api.min");
let Waves;
describe('utils/request', () => {
    beforeEach(() => {
        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
    });
    it('should normalize all types of paths', () => {
        getChai_1.expect(Waves.request.normalizePath('/transactions/unconfirmed')).to.equal('/transactions/unconfirmed');
        getChai_1.expect(Waves.request.normalizePath('/transactions///unconfirmed/')).to.equal('/transactions/unconfirmed');
        getChai_1.expect(Waves.request.normalizePath('//transactions/unconfirmed')).to.equal('/transactions/unconfirmed');
        getChai_1.expect(Waves.request.normalizePath('\/\/transactions/unconfirmed')).to.equal('/transactions/unconfirmed');
        getChai_1.expect(Waves.request.normalizePath('\/\/transactions\/unconfirmed\/\///\/')).to.equal('/transactions/unconfirmed');
        getChai_1.expect(Waves.request.normalizePath('transactions/unconfirmed/')).to.equal('/transactions/unconfirmed');
    });
    it('should normalize all type of hosts', () => {
        getChai_1.expect(Waves.request.normalizeHost('https://nodes.wavesnodes.com')).to.equal('https://nodes.wavesnodes.com');
        getChai_1.expect(Waves.request.normalizeHost('https://nodes.wavesnodes.com/')).to.equal('https://nodes.wavesnodes.com');
        getChai_1.expect(Waves.request.normalizeHost('https://nodes.wavesnodes.com//')).to.equal('https://nodes.wavesnodes.com');
        getChai_1.expect(Waves.request.normalizeHost('https://nodes.wavesnodes.com///')).to.equal('https://nodes.wavesnodes.com');
    });
});
//# sourceMappingURL=request.spec.js.map