import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const currencyLayerConfig = registerAs('currencyLayer', () => ({
    baseUrlHttps: process.env.BASE_URL_HTTPS,
    historicalEndpoint: process.env.HISTORICAL_ENDPOINT,
    accessKey: process.env.ACCESS_KEY,
}));

export const currencyLayerConfigurationValidationSchema = Joi.object({
    BASE_URL_HTTPS: Joi.string().required(),
    HISTORICAL_ENDPOINT: Joi.string().required(),
    ACCESS_KEY: Joi.string().required()
});

export const currencyLayerConfigObject = {
    config: currencyLayerConfig,
    validationSchema: currencyLayerConfigurationValidationSchema,
};
