import {Module} from "@nestjs/common";
import {HttpModule} from "@nestjs/axios";
import {currencyLayerProviders} from "./currencyLayerConfig";
import {CurrencyLayerClient} from "./currencyLayerClient";
import {LoggerProvider} from "../constants/constants";

@Module({
    imports: [HttpModule],
    providers: [ ...currencyLayerProviders , CurrencyLayerClient , LoggerProvider],
    exports: [ ...currencyLayerProviders , CurrencyLayerClient],
})
export class CurrencyLayerModule {}