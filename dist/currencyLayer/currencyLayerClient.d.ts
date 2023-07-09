import { HttpService } from "@nestjs/axios";
import { convertKey } from "../convert/interfaces/conversion.interfaces";
import { ExchangeRates } from "../convert/interfaces/exchangeRates.interface";
import { Logger } from "../logger/logger";
import { ExternalCurrencyClient } from "./currencyLayerClient.interface";
export declare class CurrencyLayerClient implements ExternalCurrencyClient {
    readonly config: any;
    private readonly httpService;
    private logger;
    constructor(config: any, httpService: HttpService, logger: Logger);
    getHistoricalRates(data: convertKey): Promise<ExchangeRates>;
    private handleErrors;
    private buildRequestUrl;
}
