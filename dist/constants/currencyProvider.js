"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyProvider = exports.Currency_Provider = void 0;
const currencyLayerClient_1 = require("../currencyLayer/currencyLayerClient");
exports.Currency_Provider = "external_currency_client";
exports.CurrencyProvider = {
    provide: "external_currency_client",
    useClass: currencyLayerClient_1.CurrencyLayerClient,
};
//# sourceMappingURL=currencyProvider.js.map