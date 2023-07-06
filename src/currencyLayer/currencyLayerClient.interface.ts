import {convertKey} from "../interfaces/conversion.interfaces";
import {ExchangeRates} from "../interfaces/exchangeRates.interface";

export interface CurrencyLayerClientInterface {
    getHistoricalRates(data: convertKey): Promise<ExchangeRates>
}