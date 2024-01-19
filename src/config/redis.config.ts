import { registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const redisConfig = registerAs('redis', () => ({
    host: process.env['REDIS_HOST'],
    port: parseInt(process.env['REDIS_PORT'] ?? ''),
    password: process.env['REDIS_PASSWORD'],
}))
export const redisConfigurationValidationSchema = Joi.object({
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().integer().required(),
    REDIS_PASSWORD: Joi.string().required(),
})
export const redisConfigObject = {
    config: redisConfig,
    validationSchema:redisConfigurationValidationSchema
}