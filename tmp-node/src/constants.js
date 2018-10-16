"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAVES = 'PONGO';
exports.WAVES_PROPS = {
    id: exports.WAVES,
    name: 'Pongo',
    precision: 8,
    description: ''
};
exports.MAINNET_BYTE = 'W'.charCodeAt(0);
exports.TESTNET_BYTE = 'L'.charCodeAt(0);
exports.INITIAL_NONCE = 0;
exports.ADDRESS_VERSION = 1;
exports.ALIAS_VERSION = 2;
exports.ISSUE_TX = 3;
exports.TRANSFER_TX = 4;
exports.REISSUE_TX = 5;
exports.BURN_TX = 6;
exports.EXCHANGE_TX = 7;
exports.LEASE_TX = 8;
exports.CANCEL_LEASING_TX = 9;
exports.CREATE_ALIAS_TX = 10;
exports.MASS_TRANSFER_TX = 11;
exports.ISSUE_TX_NAME = 'issue';
exports.TRANSFER_TX_NAME = 'transfer';
exports.REISSUE_TX_NAME = 'reissue';
exports.BURN_TX_NAME = 'burn';
exports.EXCHANGE_TX_NAME = 'exchange';
exports.LEASE_TX_NAME = 'lease';
exports.CANCEL_LEASING_TX_NAME = 'cancelLeasing';
exports.CREATE_ALIAS_TX_NAME = 'createAlias';
exports.MASS_TRANSFER_TX_NAME = 'massTransfer';
exports.PRIVATE_KEY_LENGTH = 32;
exports.PUBLIC_KEY_LENGTH = 32;
exports.MINIMUM_FEE = 100000;
exports.MINIMUM_ISSUE_FEE = 100000000;
exports.MINIMUM_MATCHER_FEE = 300000;
exports.TRANSFER_ATTACHMENT_BYTE_LIMIT = 140;
exports.DEFAULT_MIN_SEED_LENGTH = 25;
exports.DEFAULT_ORDER_EXPIRATION_DAYS = 20;
exports.DEFAULT_BASIC_CONFIG = {
    minimumSeedLength: exports.DEFAULT_MIN_SEED_LENGTH,
    requestOffset: 0,
    requestLimit: 100,
    logLevel: 'warning',
    timeDiff: 0
};
exports.DEFAULT_MAINNET_CONFIG = Object.assign({}, exports.DEFAULT_BASIC_CONFIG, { networkByte: exports.MAINNET_BYTE, nodeAddress: 'https://nodes.wavesplatform.com', matcherAddress: 'https://matcher.wavesplatform.com' });
exports.DEFAULT_TESTNET_CONFIG = Object.assign({}, exports.DEFAULT_BASIC_CONFIG, { networkByte: exports.TESTNET_BYTE, nodeAddress: 'https://node.pongo.online', matcherAddress: 'https://node.pongo.online/matcher' });
exports.WAVES_V1_ISSUE_TX = {
    assetId: exports.WAVES,
    decimals: 8,
    description: '',
    fee: 0,
    height: 0,
    id: exports.WAVES,
    name: 'Pongo',
    quantity: 100000000 * Math.pow(10, 8),
    reissuable: false,
    sender: exports.WAVES,
    senderPublicKey: '',
    signature: '',
    timestamp: 1460419200000,
    type: exports.ISSUE_TX
};
//# sourceMappingURL=constants.js.map