import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConvertModule } from "../convert/convert.module";
import { ConvertController } from "../convert/convert.controller";
import { CurrencyLayerModule } from "../currencyLayer/currencyLayerModule";
import {LoggerModule} from "../logger/logger.module";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConvertModule,
    CurrencyLayerModule,
    LoggerModule
  ],
  controllers: [ConvertController],
})
export class AppModule {}
