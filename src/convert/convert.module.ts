import {Module} from '@nestjs/common';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';
import {CurrencyLayerModule} from "../currencyLayer/currencyLayerModule";
import {LoggerProvider} from "../logger/loggerProvider";
import {CurrencyProvider} from "../currencyLayer/currencyProvider";

@Module({
  imports: [CurrencyLayerModule] ,
  controllers: [ConvertController],
  providers: [ConvertService, LoggerProvider , CurrencyProvider],
  exports: [ConvertService]
})
export class ConvertModule {}
