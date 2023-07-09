"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyLayerError = void 0;
class CurrencyLayerError extends Error {
    constructor({ code, message }) {
        super(message);
        this.code = code;
        this.name = "CurrencyLayerError";
    }
}
exports.CurrencyLayerError = CurrencyLayerError;
//# sourceMappingURL=currencyLayerError.js.map