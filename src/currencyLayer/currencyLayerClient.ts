import { CurrencyLayerError } from "./currencyLayerError";
import { BASE_URL_HTTPS, HISTORICAL_ENDPOINT } from "../constants/constants";
import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { convertKey } from "../convert/interfaces/conversion.interfaces";
import { ExchangeRates } from "../convert/interfaces/exchangeRates.interface";
import { lastValueFrom } from "rxjs";
import {LoggerProvider} from "../logger/logger";
import { ExternalCurrencyClient } from "./currencyLayerClient.interface";
import { CURRENCY_LAYER_CONFIG } from "../constants/currencyLayerConfig";

@Injectable()
export class CurrencyLayerClient implements ExternalCurrencyClient {
  constructor(
    @Inject(CURRENCY_LAYER_CONFIG) readonly config,
    private readonly httpService: HttpService,
    private logger: LoggerProvider
  ) {
    if (!this.config.apiKey) {
      throw new Error("apiKey must be provided");
    }
  }

  async getHistoricalRates(data: convertKey): Promise<ExchangeRates> {
    const requestUrl = this.buildRequestUrl(HISTORICAL_ENDPOINT, {
      source: data.source,
      destination: data.destination,
      date: data.date,
    });
    const response = await this.httpService.get<ExchangeRates>(
      requestUrl.toString()
    );
    return lastValueFrom(response)
      .then((res) => res.data)
      .then(this.handleResponseData);
  }

  private handleResponseData(res: any) {
    if (!res.success) {
      this.logger.error(
        `Error in fetching external currencies - code : ${res.error.code}. info : ${res.error.info}.`
      );
      throw new CurrencyLayerError({
        code: res.error.code,
        message: res.error.info,
      });
    }
    return res;
  }

  private buildRequestUrl(endpoint: string, data: convertKey): URL {
    const currencies =
      data.destination.length > 1
        ? data.destination.join(",")
        : data.destination;

    const queryParams = new URLSearchParams([
      ["access_key", this.config.apiKey],
      ["date", data.date],
      ["currencies", currencies],
      ["source", data.source],
    ]);

    const url = new URL(`${BASE_URL_HTTPS}${endpoint}`);
    url.search = queryParams.toString();
    return url;
  }
}
