import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { currencyLayerProvider } from "../constants/currencyLayerConfig";
import { CurrencyLayerClient } from "./currencyLayerClient";
import {LoggerModule} from "../logger/logger.module";

@Module({
  imports: [HttpModule , LoggerModule],
  providers: [currencyLayerProvider, CurrencyLayerClient],
  exports: [currencyLayerProvider, CurrencyLayerClient, HttpModule],
})
export class CurrencyLayerModule {}
