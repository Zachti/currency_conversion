"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerProvider = exports.CURRENCY_LAYER_CONFIG = exports.Logger_Provider = exports.HISTORICAL_ENDPOINT = exports.BASE_URL_HTTPS = exports.BASE_URL_HTTP = exports.DATE_CANNOT_BE_FUTURE = exports.DATE_MUST_BE_ISO8601 = exports.DATE_MUST_BE_STRING = exports.dateMessage2010 = void 0;
const currencyLayerConfig_1 = require("../currencyLayer/currencyLayerConfig");
const logger_1 = require("../logger");
exports.dateMessage2010 = `date must be after 1/1/2010`;
exports.DATE_MUST_BE_STRING = `date must be a string`;
exports.DATE_MUST_BE_ISO8601 = `date should be according to ISO 8601 format (${currencyLayerConfig_1.currencyLayerConfig.dateFormat})`;
exports.DATE_CANNOT_BE_FUTURE = `date cannot be a future date`;
exports.BASE_URL_HTTP = 'http://apilayer.net/api';
exports.BASE_URL_HTTPS = 'https://apilayer.net/api';
exports.HISTORICAL_ENDPOINT = '/historical';
exports.Logger_Provider = 'logger';
exports.CURRENCY_LAYER_CONFIG = 'CURRENCY_LAYER_CONFIG';
exports.LoggerProvider = {
    provide: 'logger',
    useClass: logger_1.ConsoleLogger
};
//# sourceMappingURL=constants.js.map