import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { currencyLayerProvider } from "../constants/currencyLayerConfig";
import { CurrencyLayerClient } from "./currencyLayerClient";

@Module({
  imports: [HttpModule],
  providers: [currencyLayerProvider, CurrencyLayerClient],
  exports: [currencyLayerProvider, CurrencyLayerClient, HttpModule],
})
export class CurrencyLayerModule {}
