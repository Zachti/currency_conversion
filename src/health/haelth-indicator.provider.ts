import { Inject, Injectable } from '@nestjs/common'
import { HealthIndicatorFunction, HttpHealthIndicator } from '@nestjs/terminus'
import { ConfigType } from '@nestjs/config'
import {currencyLayerConfig} from "../config/currencyLayer.config";

@Injectable()
export class CConvertorHealthIndicatorsProvider {
    constructor(
        private http: HttpHealthIndicator ,
        @Inject(currencyLayerConfig.KEY) private readonly Cfg: ConfigType<typeof currencyLayerConfig>,) {}

    async getIndicators(): Promise<Array<HealthIndicatorFunction>> {

        return [
            () => this.http.pingCheck('currency layer', `${this.Cfg.baseUrlHttps}${this.Cfg.historicalEndpoint}`)
        ]
    }
}
