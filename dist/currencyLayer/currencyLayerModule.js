"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyLayerModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const currencyLayerConfig_1 = require("../constants/currencyLayerConfig");
const currencyLayerClient_1 = require("./currencyLayerClient");
const loggerProvider_1 = require("../logger/loggerProvider");
let CurrencyLayerModule = exports.CurrencyLayerModule = class CurrencyLayerModule {
};
exports.CurrencyLayerModule = CurrencyLayerModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [...currencyLayerConfig_1.currencyLayerProviders, currencyLayerClient_1.CurrencyLayerClient, loggerProvider_1.LoggerProvider],
        exports: [...currencyLayerConfig_1.currencyLayerProviders, currencyLayerClient_1.CurrencyLayerClient, axios_1.HttpModule],
    })
], CurrencyLayerModule);
//# sourceMappingURL=currencyLayerModule.js.map