import { Inject, Injectable } from "@nestjs/common";
import { ConvertInputDto } from "./dto/convert.input.dto";
import { Big } from "big.js";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  conversionData,
  conversionOutput,
  getRatesInput,
} from "./interfaces/conversion.interfaces";
import { ExchangeRates } from "./interfaces/exchangeRates.interface";
import { LoggerProvider } from "../logger/logger";
import { ExchangeRatesDatasource } from "../currencyLayer/currencyLayerClient.interface";
import { Currency_Client_Provider } from "../providers/currencyProvider";

@Injectable()
export class ConvertService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(Currency_Client_Provider)
    private readonly client: ExchangeRatesDatasource,
    private readonly logger: LoggerProvider
  ) {}

  async convert(query: ConvertInputDto) {
    const exchangeRates = await this.fetchExchangeRates(query);
    return exchangeRates.rates.map((rate, timestamp) =>
      this.createConversionOutput({
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
    const input: getRatesInput = {
      source: query.source,
      destinations: query.destinations,
      date: query.date,
    };
    const cacheKey = this.generateCacheKey(input);
    return this.cacheManager.wrap(cacheKey, async () => {
      this.logger.log(
        "info",
        "Exchange rates were not found in cache, getting from external"
      );
      return this.fetchExchangeRatesFromExternal(input);
    });
  }

  private createConversionOutput(data: conversionData): conversionOutput {
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

  private fetchExchangeRatesFromExternal(
    input: getRatesInput
  ): Promise<ExchangeRates> {
    return this.client.getRates(input);
  }

  private generateCacheKey(input: getRatesInput): string {
    const destinations = input.destinations.join(",");
    return `exchange_rates:${input.source}_${destinations}_${input.date}`;
  }
}
