import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const currencyLayerConfig = {
  apiKey: configService.get<string>('apiKey'),
  dateFormat: "YYYY-MM-DD", // should be according to ISO 8601 format
};

export const currencyLayerProvider =
  {
    provide: "CURRENCY_LAYER_CONFIG",
    useValue: currencyLayerConfig,
  };

export const CURRENCY_LAYER_CONFIG = "CURRENCY_LAYER_CONFIG";
