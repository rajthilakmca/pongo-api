"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChai_1 = require("../_helpers/getChai");
const deterministicSign_1 = require("../_helpers/deterministicSign");
const base58_1 = require("../../src/libs/base58");
const WavesAPI = require("../../dist/waves-api.min");
function checkBasicCases(preparedData, data, txType, expectedSignature) {
    getChai_1.expect(preparedData.transactionType).to.equal(txType);
    getChai_1.expect(preparedData.signature).to.equal(expectedSignature);
    const givenKeys = Object.keys(preparedData).sort();
    const expectedKeys = ['transactionType', ...Object.keys(data), 'signature'].sort();
    getChai_1.expect(givenKeys).to.deep.equal(expectedKeys);
}
let Waves;
let Transactions;
let byteProcessors;
let keys;
let issueData;
let transferData;
let reissueData;
let burnData;
let createAliasData;
let leaseData;
let cancelLeasingData;
let orderData;
let tempSignDataMethod;
describe('Transactions', () => {
    beforeEach(() => {
        Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
        Transactions = Waves.Transactions;
        byteProcessors = Waves.byteProcessors;
        keys = {
            publicKey: 'FJuErRxhV9JaFUwcYLabFK5ENvDRfyJbRz8FeVfYpBLn',
            privateKey: '9dXhQYWZ5468TRhksJqpGT6nUySENxXi9nsCZH9AefD1'
        };
        tempSignDataMethod = Waves.crypto.buildTransactionSignature;
        Waves.crypto.buildTransactionSignature = deterministicSign_1.deterministicSign;
    });
    afterEach(() => {
        Waves.crypto.buildTransactionSignature = tempSignDataMethod;
    });
    describe('signing transactions', () => {
        beforeEach(() => {
            issueData = {
                senderPublicKey: keys.publicKey,
                name: 'БАБЛОС',
                description: 'Some english words немного кириллических символов',
                quantity: 10000000000,
                precision: 2,
                reissuable: true,
                fee: 100000000,
                timestamp: 1478704158292
            };
            transferData = {
                senderPublicKey: keys.publicKey,
                recipient: '3N9UuGeWuDt9NfWbC5oEACHyRoeEMApXAeq',
                assetId: '246d8u9gBJqUXK1VhQBxPMLL4iiFLdc4iopFyAkqU5HN',
                amount: 1000,
                feeAssetId: Waves.constants.WAVES,
                fee: 100000,
                attachment: '',
                timestamp: 1478864678621
            };
            reissueData = {
                senderPublicKey: keys.publicKey,
                assetId: '246d8u9gBJqUXK1VhQBxPMLL4iiFLdc4iopFyAkqU5HN',
                quantity: 100000000,
                reissuable: false,
                fee: 100000000,
                timestamp: 1478868177862
            };
            burnData = {
                senderPublicKey: keys.publicKey,
                assetId: '246d8u9gBJqUXK1VhQBxPMLL4iiFLdc4iopFyAkqU5HN',
                quantity: 200000000,
                fee: 100000,
                timestamp: 1478864678621
            };
            createAliasData = {
                senderPublicKey: keys.publicKey,
                alias: 'sasha',
                fee: 1000000,
                timestamp: 1491556329420
            };
            leaseData = {
                senderPublicKey: keys.publicKey,
                recipient: '3MsiHfvFVUULdn8bpVoDQ7JLKKjtPXUrCLT',
                amount: 200000000,
                fee: 1000000,
                timestamp: 1491491715188
            };
            cancelLeasingData = {
                senderPublicKey: keys.publicKey,
                transactionId: '4X85MhqxukwaPqJC4sSSeN3ptSYHbEca7KgiYtUa2ECX',
                fee: 10000000,
                timestamp: 1491491734819
            };
            orderData = {
                senderPublicKey: keys.publicKey,
                matcherPublicKey: 'Ei5BT6ZvKmB5VQLSZGo8mNkSXsTwGG4zUWjN7yu7iZo5',
                amountAsset: Waves.constants.WAVES,
                priceAsset: 'AaFXAN1WTM39XjECHW7DsVFixhq9yMGWHdM2ghr83Gmf',
                orderType: 'sell',
                amount: 200000000,
                price: 50000000,
                timestamp: 1489592282029,
                expiration: 1492184282029,
                matcherFee: 1000000
            };
        });
        it('should sign Issue transaction', (done) => {
            const data = Object.assign({}, issueData);
            const issueTransaction = new Transactions.IssueTransaction(data);
            const expectedSignature = '5ngquur4nqX1cVPK3Zaf9KqY1qNH6i7gF5EhaWeS8mZp1LADTVuPXmNUi12jeXSniGry5a7ThsMtWcC73pSU196o';
            const api = issueTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.ISSUE_TX_NAME, expectedSignature);
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Transfer transaction', (done) => {
            const data = Object.assign({}, transferData);
            const transferTransaction = new Transactions.TransferTransaction(data);
            const expectedSignature = '677UVgKBAVZdweVbn6wKhPLP9UxVSh3x4fBXPgepKoHtsV9nSd8HXBMxCdsYn41g3EE63bcihnUHwhXoSu9GZTLf';
            const api = transferTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.TRANSFER_TX_NAME, expectedSignature);
                getChai_1.expect(preparedData.recipient).to.equal('address:' + data.recipient);
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Transfer transaction with alias', (done) => {
            const alias = 'sasha';
            const data = Object.assign({}, transferData, { recipient: alias });
            const transferTransaction = new Transactions.TransferTransaction(data);
            const expectedSignature = '2XJAHpRXx12AvdwcDF2HMpTDxffKkmN9qK7r3jZaVExYVjDaciRszymkGXy5QZExz6McYwDf6gicD4XZswJGKAZW';
            const api = transferTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.TRANSFER_TX_NAME, expectedSignature);
                getChai_1.expect(preparedData.recipient).to.equal('alias:' + String.fromCharCode(Waves.config.getNetworkByte()) + ':' + data.recipient);
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Transfer transaction with attachment', (done) => {
            const attachment = '123';
            const attachmentBytes = [49, 50, 51];
            const data = Object.assign({}, transferData, { attachment });
            const transferTransaction = new Transactions.TransferTransaction(data);
            const expectedSignature = 'TrgV7V7meddPs7aU9ZemrCXNVQ8h35cERTBNfvbtVqURbgRS1fnEmzELMAxvqeYrHF6sYiJJ4oc3v4tEZQbn5qD';
            const api = transferTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.TRANSFER_TX_NAME, expectedSignature);
                getChai_1.expect(preparedData.attachment).to.equal(base58_1.default.encode(attachmentBytes));
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Reissue transaction', (done) => {
            const data = Object.assign({}, reissueData);
            const reissueTransaction = new Transactions.ReissueTransaction(data);
            const expectedSignature = '4G81NzgHDwXdjqANGE2qxZrC5VpDA7ek3Db8v3iqunpkrXgAy7KBJgdHWUw1TEDBNewtjMJTvB9Po55PZ5d6ztCk';
            const api = reissueTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.REISSUE_TX_NAME, expectedSignature);
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Burn transaction', (done) => {
            const data = Object.assign({}, burnData);
            const burnTransaction = new Transactions.BurnTransaction(data);
            const expectedSignature = 'PZZPkM8zhN96fk3nsrozehYNztB9HkD48GY6zZ6DPnLkQYHYXtZ4qER3qLjxSrALeinkqrDariNzUCUbbvBrtRC';
            const api = burnTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.BURN_TX_NAME, expectedSignature);
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Create Alias transaction', (done) => {
            const data = Object.assign({}, createAliasData);
            const createAliasTransaction = new Transactions.CreateAliasTransaction(data);
            const expectedSignature = '2fDkcUaPrQjtL1Tfox1ikqfZWA7LkvWKrGZNaxJx98dmeLoopkwvAFa9nMJLww9PERGuQovfv8g9EPM6HkV5VPaH';
            const api = createAliasTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.CREATE_ALIAS_TX_NAME, expectedSignature);
            });
            const signature = createAliasTransaction.getSignature(keys.privateKey).then((signature) => {
                getChai_1.expect(signature).to.equal(expectedSignature);
            });
            const bytesByName = createAliasTransaction.getExactBytes('senderPublicKey').then((bytes) => {
                getChai_1.expect(bytes).to.deep.equal(base58_1.default.decode(data.senderPublicKey));
            });
            // Should throw when bytes of a non-existing field are requested
            getChai_1.expect(() => createAliasTransaction.getExactBytes('test')).to.throw();
            Promise.all([api, signature, bytesByName]).then(() => done());
        });
        it('should sign Lease transaction', (done) => {
            const data = Object.assign({}, leaseData);
            const leaseTransaction = new Transactions.LeaseTransaction(data);
            const expectedSignature = '4KV99VcLG51uej8tcdJBwcc3Kj2tCAxwT7JNwycxNQzAGURxcyo2XhmMTWiD1gVqs4GhkAYHGrjsBR2CJcdU5X6Z';
            const api = leaseTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.LEASE_TX_NAME, expectedSignature);
                getChai_1.expect(preparedData.recipient).to.equal('address:' + data.recipient);
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Lease transaction with alias', (done) => {
            const alias = 'test alias';
            const data = Object.assign({}, leaseData, { recipient: alias });
            const leaseTransaction = new Transactions.LeaseTransaction(data);
            const expectedSignature = 'HuKk26pPjxusLhch6ehwbFeBc8iiMuKd2pzwhwTf5rEFqSyyUiU3ChpVw3w86daRPMPkVUNkf6b9SmTetFgGxXy';
            const api = leaseTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.LEASE_TX_NAME, expectedSignature);
                getChai_1.expect(preparedData.recipient).to.equal('alias:' + String.fromCharCode(Waves.config.getNetworkByte()) + ':' + data.recipient);
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Cancel Leasing transaction', (done) => {
            const data = Object.assign({}, cancelLeasingData);
            const cancelLeasingTransaction = new Transactions.CancelLeasingTransaction(data);
            const expectedSignature = '2AcYC2TtpHRVhqN4V9cZADDz7bA2f4PVqoisBULYUn39t73jkE5fEpRZFEKgJiBU8NSPqcww9Qt7aY7VeSqpDVcW';
            const api = cancelLeasingTransaction.prepareForAPI(keys.privateKey).then((preparedData) => {
                checkBasicCases(preparedData, data, Waves.constants.CANCEL_LEASING_TX_NAME, expectedSignature);
            });
            Promise.all([api]).then(() => done());
        });
        it('should sign Order', (done) => {
            const data = Object.assign({}, orderData);
            const order = new Transactions.Order(data);
            const expectedSignature = '5pzEHRrtfzH6mY64u8d1LX8rHufEvgnZ5YxGHFW33QUoi4Fv3ScWq7AnrEQMPaZjdR4uzoN9QHWoPTmZDVgpWUbw';
            const api = order.prepareForAPI(keys.privateKey).then((preparedData) => {
                getChai_1.expect(preparedData.signature).to.equal(expectedSignature);
                const givenKeys = Object.keys(preparedData).sort();
                const expectedKeys = [...Object.keys(data), 'signature'].sort();
                getChai_1.expect(givenKeys).to.deep.equal(expectedKeys);
            });
            Promise.all([api]).then(() => done());
        });
    });
    describe('creating signable data', () => {
        it('should create a TransactionClass and sign data with it', (done) => {
            const timestamp = 1508163111028;
            const expectedSignature = '4oLrxkm2qKYgcCHcnmntGwWrDZg56GjAoN7rYaYJ4dYnRnN1z5vsd2CZrdGULqwGNAZtXhVMvREcdWJAuz3hiaVd';
            const SignableData = Transactions.createSignableData([
                new byteProcessors.Bool('flag'),
                new byteProcessors.Long('timestamp')
            ]);
            const signableData = new SignableData({
                flag: true,
                timestamp
            });
            const signature = signableData.getSignature(keys.privateKey).then((signature) => {
                getChai_1.expect(signature).to.equal(expectedSignature);
            });
            const forAPI = signableData.prepareForAPI(keys.privateKey).then((signedData) => {
                getChai_1.expect(signedData.flag).to.equal(true);
                getChai_1.expect(signedData.timestamp).to.equal(timestamp);
                getChai_1.expect(signedData.signature).to.equal(expectedSignature);
            });
            Promise.all([signature, forAPI]).then(() => done());
        });
        it('should throw when no fields are provided', () => {
            getChai_1.expect(() => Transactions.createSignableData()).to.throw();
            getChai_1.expect(() => Transactions.createSignableData([])).to.throw();
        });
        it('should throw when invalid fields are provided', () => {
            getChai_1.expect(() => Transactions.createSignableData(['hello'])).to.throw();
            getChai_1.expect(() => Transactions.createSignableData([null])).to.throw();
            getChai_1.expect(() => Transactions.createSignableData([true])).to.throw();
        });
    });
});
//# sourceMappingURL=Transactions.spec.js.map