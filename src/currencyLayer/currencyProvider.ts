import {CurrencyLayerClient} from "./currencyLayerClient";

export const Currency_Provider = 'external_currency_client';

export const CurrencyProvider = {
    provide : 'external_currency_client' ,
    useClass: CurrencyLayerClient ,
}
