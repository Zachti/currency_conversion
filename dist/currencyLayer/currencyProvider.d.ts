import { CurrencyLayerClient } from "./currencyLayerClient";
export declare const Currency_Provider = "external_currency_client";
export declare const CurrencyProvider: {
    provide: string;
    useClass: typeof CurrencyLayerClient;
};
