import {Module} from '@nestjs/common';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';
import {CurrencyLayerModule} from "../currencyLayer/currencyLayerModule";
import {LoggerProvider} from "../constants/constants";

@Module({
  imports: [CurrencyLayerModule] ,
  controllers: [ConvertController],
  providers: [ConvertService, LoggerProvider],
  exports: [ConvertService]
})
export class ConvertModule {}
