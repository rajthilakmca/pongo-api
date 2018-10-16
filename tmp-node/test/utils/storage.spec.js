"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChai_1 = require("../_helpers/getChai");
const promiseTools_1 = require("../_helpers/promiseTools");
const WavesAPI = require("../../dist/waves-api.min");
let Waves;
describe('utils/storage', () => {
    beforeEach(() => {
        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
    });
    it('should store data while working on one network', (done) => {
        const storage = Waves.storage.getStorage();
        promiseTools_1.waterfall([
            () => storage.set('a', 1),
            () => storage.get('a'),
            (a) => getChai_1.expect(a).to.equal(1)
        ]).then(() => done());
    });
    it('should store data only once while working on one network', (done) => {
        const storage = Waves.storage.getStorage();
        promiseTools_1.waterfall([
            () => storage.set('a', 1),
            () => storage.set('a', 1),
            () => storage.getAll().then((data) => {
                getChai_1.expect(data['a']).to.equal(1);
                getChai_1.expect(Object.keys(data)).to.deep.equal(['a']);
            })
        ]).then(() => done());
    });
    it('should store data while working on different networks', (done) => {
        const storage = Waves.storage.getStorage();
        Waves.config.set({ networkByte: 'A' });
        promiseTools_1.waterfall([
            () => storage.set('a', 1),
            () => storage.get('a'),
            (a) => getChai_1.expect(a).to.equal(1),
            () => Waves.config.set({ networkByte: 'B' }),
            () => storage.get('a'),
            (a) => getChai_1.expect(a).to.be.a('null')
        ]).then(() => done());
    });
    it('should store data only once for every network', (done) => {
        const storage = Waves.storage.getStorage();
        Waves.config.set({ networkByte: 'A' });
        promiseTools_1.waterfall([
            () => storage.set('a', 1),
            () => storage.set('a', 1),
            () => storage.getAll().then((data) => {
                getChai_1.expect(data['a']).to.equal(1);
                getChai_1.expect(Object.keys(data)).to.deep.equal(['a']);
            }),
            () => Waves.config.set({ networkByte: 'B' }),
            () => storage.get('a'),
            (a) => getChai_1.expect(a).to.be.a('null'),
            () => storage.set('a', 2),
            () => storage.set('a', 2),
            () => storage.getAll().then((data) => {
                getChai_1.expect(data['a']).to.equal(2);
                getChai_1.expect(Object.keys(data)).to.deep.equal(['a']);
            })
        ]).then(() => done());
    });
    it('should always store the data written last', (done) => {
        const storage = Waves.storage.getStorage();
        promiseTools_1.waterfall([
            () => storage.set('a', 1),
            () => storage.set('a', 2),
            () => storage.set('a', 3),
            () => storage.get('a'),
            (a) => getChai_1.expect(a).to.equal(3)
        ]).then(() => done());
    });
    it('should return all data in the form of an object', (done) => {
        const storage = Waves.storage.getStorage();
        promiseTools_1.waterfall([
            () => storage.set('a', 1),
            () => storage.set('b', 2),
            () => storage.set('c', 3),
            () => storage.getAll(),
            (data) => getChai_1.expect(data).to.deep.equal({ a: 1, b: 2, c: 3 })
        ]).then(() => done());
    });
    it('should return all data in the form of an array', (done) => {
        const storage = Waves.storage.getStorage();
        promiseTools_1.waterfall([
            () => storage.set('a', 1),
            () => storage.set('b', 2),
            () => storage.set('c', 3),
            () => storage.getList(),
            (list) => getChai_1.expect(list).to.have.members([1, 2, 3])
        ]).then(() => done());
    });
});
//# sourceMappingURL=storage.spec.js.map