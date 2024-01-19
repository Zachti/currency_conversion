import { Module } from "@nestjs/common";
import {HttpModule, HttpService} from "@nestjs/axios";
import { CurrencyLayerClient } from "./currencyLayerClient";

@Module({
  imports: [HttpModule],
  providers: [CurrencyLayerClient],
  exports: [CurrencyLayerClient, HttpModule],
})
export class CurrencyLayerModule {}
