import { currencyLayerConfig } from '../currencyLayer/currencyLayerConfig';
import {ConsoleLogger} from "../logger";
import {Provider} from "@nestjs/common";

export const dateMessage2010 = `date must be after 1/1/2010`;
export const DATE_MUST_BE_STRING = `date must be a string`;
export const DATE_MUST_BE_ISO8601 = `date should be according to ISO 8601 format (${currencyLayerConfig.dateFormat})`;
export const DATE_CANNOT_BE_FUTURE = `date cannot be a future date`;

export const BASE_URL_HTTP = 'http://apilayer.net/api';
export const BASE_URL_HTTPS = 'https://apilayer.net/api';
export const HISTORICAL_ENDPOINT = '/historical';
export const Logger_Provider = 'logger';
export const CURRENCY_LAYER_CONFIG = 'CURRENCY_LAYER_CONFIG';

export const LoggerProvider: Provider =  {
    provide: 'logger',
    useClass: ConsoleLogger
}

