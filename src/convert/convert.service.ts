import { Inject, Injectable } from "@nestjs/common";
import { ConvertInputDto } from "./dto/convert.input.dto";
import { Big } from "big.js";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  conversionData,
  conversionOutput,
  convertKey,
} from "./interfaces/conversion.interfaces";
import { ExchangeRates } from "./interfaces/exchangeRates.interface";
import { LoggerProvider } from "../logger/logger";
import { ExternalCurrencyClient } from "../currencyLayer/currencyLayerClient.interface";
import { Currency_Client_Provider } from "../constants/currencyProvider";

@Injectable()
export class ConvertService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(Currency_Client_Provider)
    private readonly client: ExternalCurrencyClient,
    private readonly logger: LoggerProvider
  ) {}

  async convert(query: ConvertInputDto) {
    const exchangeRates = await this.fetchExchangeRates(query);
    return exchangeRates.rates.map((rate, timestamp) =>
      this.performConversion({
        rate: rate.rate,
        query,
        timestamp,
        currency: rate.currency,
      })
    );
  }

  private async fetchExchangeRates(
    query: ConvertInputDto
  ): Promise<ExchangeRates> {
    const input: convertKey = {
      source: query.source,
      destination: query.destination,
      date: query.date,
    };
    const cacheKey = this.generateCacheKey(input);
    return this.cacheManager.wrap(cacheKey, async () => {
      this.logger.log(
        "info",
        "Exchange rates were not found in cache, getting from external"
      );
      return await this.fetchFromExternal(input);
    });
  }

  private performConversion(data: conversionData): conversionOutput {
    const rate = new Big(data.rate);
    const amount = new Big(data.query.amount);
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

  private async fetchFromExternal(input: convertKey): Promise<ExchangeRates> {
    const exchangeRates = await this.client.getHistoricalRates({
      date: input.date,
      source: input.source,
      destination: input.destination,
    });
    const rates: { currency: string; rate: number }[] = [];

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

  private generateCacheKey(input: convertKey): string {
    const destinations = input.destination.join(",");
    return `exchange_rates:${input.source}_${destinations}_${input.date}`;
  }
}
