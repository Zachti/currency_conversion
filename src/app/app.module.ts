import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConvertModule } from "../convert/convert.module";
import { ConvertController } from "../convert/convert.controller";
import { CurrencyLayerModule } from "../currencyLayer/currencyLayerModule";
import {LoggerModule} from "../logger/logger.module";
import {ConfigModule} from "@nestjs/config";
import appConfig from "./app.config";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    ConvertModule,
    CurrencyLayerModule,
    LoggerModule
  ],
  controllers: [ConvertController],
})
export class AppModule {}
