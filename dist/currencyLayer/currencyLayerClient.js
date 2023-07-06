"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyLayerClient = void 0;
const currencyLayerError_1 = require("./currencyLayerError");
const constants_1 = require("../constants/constants");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const loggerProvider_1 = require("../logger/loggerProvider");
const currencyLayerConfig_1 = require("../constants/currencyLayerConfig");
let CurrencyLayerClient = exports.CurrencyLayerClient = class CurrencyLayerClient {
    constructor(config, httpService, logger) {
        this.config = config;
        this.httpService = httpService;
        this.logger = logger;
        if (!this.config.apiKey) {
            throw new Error('apiKey must be provided');
        }
    }
    async getHistoricalRates(data) {
        const requestUrl = this.buildRequestUrl(constants_1.HISTORICAL_ENDPOINT, { source: data.source, destination: data.destination, date: data.date });
        const response = await this.httpService.get(requestUrl.toString());
        return (0, rxjs_1.lastValueFrom)(response).then(res => res.data).then(this.handleErrors);
    }
    handleErrors(res) {
        if (!res.success) {
            this.logger.error(`Error in fetching external currencies - code : ${res.error.code}. info : ${res.error.info}.`);
            throw new currencyLayerError_1.CurrencyLayerError({ code: res.error.code, message: res.error.info });
        }
        return res;
    }
    buildRequestUrl(endpoint, data) {
        const currencies = data.destination.length > 1 ? data.destination.join(',') : data.destination;
        const queryParams = new URLSearchParams([
            ['access_key', this.config.apiKey],
            ['date', data.date],
            ['currencies', currencies],
            ['source', data.source],
        ]);
        const url = new URL(`${constants_1.BASE_URL_HTTPS}${endpoint}`);
        url.search = queryParams.toString();
        return url;
    }
};
exports.CurrencyLayerClient = CurrencyLayerClient = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(currencyLayerConfig_1.CURRENCY_LAYER_CONFIG)),
    __param(2, (0, common_1.Inject)(loggerProvider_1.Logger_Provider)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService, Object])
], CurrencyLayerClient);
//# sourceMappingURL=currencyLayerClient.js.map