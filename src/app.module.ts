import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConvertModule } from "./convert/convert.module";
import { ConvertController } from "./convert/convert.controller";
import { CurrencyLayerModule } from "./currencyLayer/currencyLayerModule";
import { LoggerModule } from "./logger/logger.module";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { currencyLayerConfig } from "./config/currencyLayer.config";
import { HealthModule } from "./health/health.module";
import { redisConfig } from "./config/redis.config";
import redisStore from "cache-manager-redis-store";
import { StoreConfig } from "cache-manager";
import { ConfigurationValidationSchema } from "./config/validationSchema";

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (config: ConfigType<typeof redisConfig>) => {
        return {
          store: redisStore,
          host: config.host,
          port: config.port,
          password: config.password
        } as StoreConfig
      },
      inject: [redisConfig.KEY]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [currencyLayerConfig, redisConfig],
      validationSchema: ConfigurationValidationSchema,
      validationOptions: { presence: 'required' }
    }),
    ConvertModule,
    CurrencyLayerModule,
    LoggerModule,
    HealthModule
  ],
  controllers: [ConvertController],
})
export class AppModule {}
