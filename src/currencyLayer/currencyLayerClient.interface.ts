import { convertKey } from "../convert/interfaces/conversion.interfaces";
import { ExchangeRates } from "../convert/interfaces/exchangeRates.interface";

export interface ExternalCurrencyClient {
  getHistoricalRates(data: convertKey): Promise<ExchangeRates>;
}
