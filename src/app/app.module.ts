import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConvertModule } from '../convert/convert.module';
import {ConvertService} from "../convert/convert.service";
import {ConvertController} from "../convert/convert.controller";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {LoggerProvider} from "../constants/constants";
import {CurrencyLayerModule} from "../currencyLayer/currencyLayerModule";
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConvertModule,
      CurrencyLayerModule ,
  ],
  controllers: [AppController , ConvertController] ,
  providers: [AppService ,LoggerProvider ]
})
export class AppModule {}
