import * as Joi from "joi";

export const ConfigurationValidationSchema = Joi.object({
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().integer().required(),
    REDIS_PASSWORD: Joi.string().required(),
    BASE_URL_HTTPS: Joi.string().required(),
    HISTORICAL_ENDPOINT: Joi.string().required(),
    ACCESS_KEY: Joi.string().required()
})