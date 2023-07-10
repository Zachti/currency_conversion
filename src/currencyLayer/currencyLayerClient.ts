import { CurrencyLayerError } from "./currencyLayerError";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { getRatesInput } from "../convert/interfaces/conversion.interfaces";
import { ExchangeRates } from "../convert/interfaces/exchangeRates.interface";
import { lastValueFrom } from "rxjs";
import { LoggerProvider } from "../logger/logger";
import { ExchangeRatesDatasource } from "./currencyLayerClient.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CurrencyLayerClient implements ExchangeRatesDatasource {
  private readonly apiKey: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: LoggerProvider,
    private readonly configService: ConfigService
  ) {
    this.apiKey = configService.getOrThrow<string>(
      "currencyLayerConfig.apiKey"
    );
  }

  async getRates(data: getRatesInput): Promise<ExchangeRates> {
    const requestUrl = this.buildRequestUrl(
      this.configService.getOrThrow<string>(
        "currencyLayerConfig.historicalEndpoint"
      ),
      {
        source: data.source,
        destinations: data.destinations,
        date: data.date,
      }
    );
    const response = await this.httpService.get<ExchangeRates>(
      requestUrl.toString()
    );
    return lastValueFrom(response).then((res) =>
      this.handleResponseData(res.data, data.destinations)
    );
  }

  private handleResponseData(
    res: any,
    destinations: string[]
  ): Promise<ExchangeRates> {
    if (!res.success) {
      this.logger.error(
        `Error in fetching external currencies - code : ${res.error.code}. info : ${res.error.info}.`
      );
      throw new CurrencyLayerError({
        code: res.error.code,
        message: res.error.info,
      });
    }
    return this.addRatesToResponseData(res, destinations);
  }

  private addRatesToResponseData(
    res: any,
    destinations: string[]
  ): Promise<ExchangeRates> {
    const rates = [];

    destinations.forEach((destination) => {
      const currencyCode = `${res.source}${destination}`;
      const rate = res.quotes[currencyCode];
      if (rate) {
        rates.push({
          currency: destination,
          rate,
        });
      }
    });

    return {
      ...res,
      rates,
    };
  }

  private buildRequestUrl(endpoint: string, data: getRatesInput): URL {
    const currencies =
      data.destinations.length > 1
        ? data.destinations.join(",")
        : data.destinations.toString();

    const queryParams = new URLSearchParams([
      ["access_key", this.apiKey],
      ["date", data.date],
      ["currencies", currencies],
      ["source", data.source],
    ]);

    const url = new URL(
      `${this.httpService.axiosRef.defaults.baseURL}${endpoint}`
    );
    url.search = queryParams.toString();
    return url;
  }
}
