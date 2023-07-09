const apiKey = "13e21855529794b1addf14d688c1e607";

export const currencyLayerConfig = {
  apiKey,
  dateFormat: "YYYY-MM-DD", // should be according to ISO 8601 format
  defaultSourceCurrencyCode: "USD",
  name: "CurrencyLayer",
};

export const currencyLayerProvider =
  {
    provide: "CURRENCY_LAYER_CONFIG",
    useValue: currencyLayerConfig,
  };

export const CURRENCY_LAYER_CONFIG = "CURRENCY_LAYER_CONFIG";
