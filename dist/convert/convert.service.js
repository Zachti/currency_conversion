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
var ConvertService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertService = void 0;
const common_1 = require("@nestjs/common");
const big_js_1 = require("big.js");
const cache_manager_1 = require("@nestjs/cache-manager");
const loggerProvider_1 = require("../logger/loggerProvider");
const currencyProvider_1 = require("../currencyLayer/currencyProvider");
let ConvertService = exports.ConvertService = ConvertService_1 = class ConvertService {
    constructor(cacheManager, client, logger) {
        this.cacheManager = cacheManager;
        this.client = client;
        this.logger = logger;
    }
    async convert(query) {
        const exchangeRates = await this.fetchExchangeRates(query);
        return exchangeRates.rates.map((rate, timestamp) => ConvertService_1.Conversion({ rate: rate.rate, query, timestamp, currency: rate.currency }));
    }
    async fetchExchangeRates(query) {
        const input = {
            source: query.source,
            destination: query.destination,
            date: query.date,
        };
        const cacheKey = this.generateCacheKey(input);
        return this.cacheManager.wrap(cacheKey, async () => {
            this.logger.log('info', 'Exchange rates were not found in cache, getting from external');
            return await this.fetchFromExternal(input);
        });
    }
    static Conversion(data) {
        const rate = new big_js_1.Big(data.rate);
        const amount = new big_js_1.Big(data.query.amount);
        const result = rate.times(amount).toFixed(4);
        return {
            source: data.query.source,
            destination: data.currency,
            timestamp: data.timestamp,
            amount: amount.toNumber(),
            rate: rate.toNumber(),
            result,
        };
    }
    async fetchFromExternal(input) {
        const exchangeRates = await this.client.getHistoricalRates({ date: input.date, source: input.source, destination: input.destination, });
        const rates = [];
        input.destination.forEach((destination) => {
            const currencyCode = `${input.source}${destination}`;
            const rate = exchangeRates.quotes[currencyCode];
            if (rate) {
                rates.push({
                    currency: destination,
                    rate,
                });
            }
        });
        return {
            ...exchangeRates,
            rates,
        };
    }
    generateCacheKey(input) {
        const destinations = input.destination.join(',');
        return `exchange_rates:${input.source}_${destinations}_${input.date}`;
    }
};
exports.ConvertService = ConvertService = ConvertService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, common_1.Inject)(currencyProvider_1.Currency_Provider)),
    __param(2, (0, common_1.Inject)(loggerProvider_1.Logger_Provider)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ConvertService);
//# sourceMappingURL=convert.service.js.map