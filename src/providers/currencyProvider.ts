import { CurrencyLayerClient } from "../currencyLayer/currencyLayerClient";

export const Currency_Client_Provider = "external_currency_client";

export const CurrencyClientProvider = {
  provide: "external_currency_client",
  useClass: CurrencyLayerClient,
};
