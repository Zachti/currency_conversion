export interface ExchangeRates {
  success: boolean;
  terms: string;
  privacy: string;
  historical: boolean;
  date: string;
  timestamp: number;
  source: string;
  quotes: {
    [currencyCode: string]: number;
  };
  rates: rates[];
}

export interface rates {
  currency: string;
  rate: number;
}
