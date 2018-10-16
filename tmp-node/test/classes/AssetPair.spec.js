"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resetRequireCache_1 = require("../_helpers/resetRequireCache");
resetRequireCache_1.default('dist/waves-api.min');
const getChai_1 = require("../_helpers/getChai");
const mockableFetch_1 = require("../_helpers/mockableFetch");
const WavesAPI = require("../../dist/waves-api.min");
let Waves;
let AssetPair;
let fakeWAVES;
let fakeBTC;
describe('AssetPair', () => {
    beforeEach((done) => {
        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
        AssetPair = Waves.AssetPair;
        Promise.all([
            Waves.Asset.get({
                id: 'WAVES',
                name: 'Waves',
                precision: 8
            }),
            Waves.Asset.get({
                id: 'BTC',
                name: 'Bitcoin',
                precision: 8
            })
        ]).then((assets) => {
            fakeWAVES = assets[0];
            fakeBTC = assets[1];
            mockableFetch_1.mockableFetch.replyWith(JSON.stringify({
                pair: {
                    amountAsset: fakeWAVES.id,
                    priceAsset: fakeBTC.id
                }
            }));
        }).then(() => done());
    });
    afterEach(() => {
        mockableFetch_1.mockableFetch.useOriginal();
    });
    describe('creating instances', () => {
        it('should be an instance of AssetPair when created from two Asset object', (done) => {
            AssetPair.get(fakeWAVES, fakeBTC).then((assetPair) => {
                getChai_1.expect(AssetPair.isAssetPair(assetPair)).to.be.true;
            }).then(() => done());
        });
        it('should be an instance of AssetPair when created from two asset IDs', (done) => {
            AssetPair.get(fakeWAVES.id, fakeBTC.id).then((assetPair) => {
                getChai_1.expect(AssetPair.isAssetPair(assetPair)).to.be.true;
            }).then(() => done());
        });
        it('should be an instance of AssetPair when created from an Asset object and an asset ID', (done) => {
            AssetPair.get(fakeWAVES, fakeBTC.id).then((assetPair) => {
                getChai_1.expect(AssetPair.isAssetPair(assetPair)).to.be.true;
            }).then(() => done());
        });
        it('should be an instance of AssetPair when created from an asset ID and an Asset object', (done) => {
            AssetPair.get(fakeWAVES.id, fakeBTC).then((assetPair) => {
                getChai_1.expect(AssetPair.isAssetPair(assetPair)).to.be.true;
            }).then(() => done());
        });
    });
    describe('core functionality', () => {
        it('should return the pair if assets are passed in the right order', (done) => {
            AssetPair.get(fakeWAVES, fakeBTC).then((assetPair) => {
                getChai_1.expect(assetPair.amountAsset).to.equal(fakeWAVES);
                getChai_1.expect(assetPair.priceAsset).to.equal(fakeBTC);
            }).then(() => done());
        });
        it('should return the pair if assets are passed in the reversed order', (done) => {
            AssetPair.get(fakeBTC, fakeWAVES).then((assetPair) => {
                getChai_1.expect(assetPair.amountAsset).to.equal(fakeWAVES);
                getChai_1.expect(assetPair.priceAsset).to.equal(fakeBTC);
            }).then(() => done());
        });
        it('should return the pair with the right precision difference', (done) => {
            AssetPair.get(fakeWAVES, fakeBTC).then((assetPair) => {
                getChai_1.expect(assetPair.precisionDifference).to.equal(0);
            }).then(() => done());
        });
    });
});
//# sourceMappingURL=AssetPair.spec.js.map