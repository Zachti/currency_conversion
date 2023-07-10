import { getRatesInput } from "../convert/interfaces/conversion.interfaces";
import { ExchangeRates } from "../convert/interfaces/exchangeRates.interface";

export interface ExchangeRatesDatasource {
  getRates(data: getRatesInput): Promise<ExchangeRates>;
}
