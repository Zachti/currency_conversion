"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyLayerProviders = exports.currencyLayerConfig = void 0;
const apiKey = '13e21855529794b1addf14d688c1e607';
exports.currencyLayerConfig = {
    apiKey,
    dateFormat: 'YYYY-MM-DD',
    defaultSourceCurrencyCode: 'USD',
    name: 'CurrencyLayer',
};
exports.currencyLayerProviders = [{
        provide: 'CURRENCY_LAYER_CONFIG',
        useValue: exports.currencyLayerConfig,
    }];
//# sourceMappingURL=currencyLayerConfig.js.map