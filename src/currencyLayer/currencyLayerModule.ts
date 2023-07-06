import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {currencyLayerProviders} from "../constants/currencyLayerConfig";
import {CurrencyLayerClient} from "./currencyLayerClient";
import {LoggerProvider} from "../logger/loggerProvider";

@Module({
    imports: [HttpModule],
    providers: [ ...currencyLayerProviders , CurrencyLayerClient  , LoggerProvider],
    exports: [ ...currencyLayerProviders , CurrencyLayerClient , HttpModule],
})
export class CurrencyLayerModule {}