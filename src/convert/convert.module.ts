import { Module } from "@nestjs/common";
import { ConvertController } from "./convert.controller";
import { ConvertService } from "./convert.service";
import { CurrencyLayerModule } from "../currencyLayer/currencyLayerModule";
import { CurrencyClientProvider } from "../constants/currencyProvider";

@Module({
  imports: [CurrencyLayerModule],
  controllers: [ConvertController],
  providers: [ConvertService, CurrencyClientProvider],
  exports: [ConvertService],
})
export class ConvertModule {}
