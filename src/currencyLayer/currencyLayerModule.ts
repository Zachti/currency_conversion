import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CurrencyLayerClient } from "./currencyLayerClient";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [HttpModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      baseURL: configService.get<string>('currencyLayerConfig.baseUrlHttps'),
    }),
    inject: [ConfigService],
  }) , ConfigModule],
  providers: [CurrencyLayerClient],
  exports: [CurrencyLayerClient , HttpModule],
})
export class CurrencyLayerModule {}
