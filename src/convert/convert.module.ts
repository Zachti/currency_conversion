import { Module } from "@nestjs/common";
import { ConvertController } from "./convert.controller";
import { ConvertService } from "./convert.service";
import { HttpModule } from "@nestjs/axios";
import { CurrencyClientProvider } from "../providers/currencyProvider";

@Module({
  imports: [HttpModule],
  controllers: [ConvertController],
  providers: [ConvertService, CurrencyClientProvider],
  exports: [ConvertService],
})
export class ConvertModule {}
