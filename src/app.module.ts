import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConvertModule } from "./convert/convert.module";
import { ConvertController } from "./convert/convert.controller";
import { CurrencyLayerModule } from "./currencyLayer/currencyLayerModule";
import { LoggerModule } from "./logger/logger.module";
import { ConfigModule } from "@nestjs/config";
import {
  currencyLayerConfig,
  currencyLayerConfigurationValidationSchema
} from "./currencyLayer/config/currencyLayer.config";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [currencyLayerConfig],
      validationSchema: currencyLayerConfigurationValidationSchema,
      validationOptions: { presence: 'required' }
    }),
    ConvertModule,
    CurrencyLayerModule,
    LoggerModule,
  ],
  controllers: [ConvertController],
})
export class AppModule {}
