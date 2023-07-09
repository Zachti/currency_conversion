import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { CurrencyLayerClient } from "./currencyLayerClient";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [CurrencyLayerClient],
  exports: [CurrencyLayerClient, HttpModule, ConfigModule],
})
export class CurrencyLayerModule {}
