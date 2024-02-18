import { Controller, Get } from '@nestjs/common'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'
import {CConvertorHealthIndicatorsProvider} from "./haelth-indicator.provider";

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private ccIndicator: CConvertorHealthIndicatorsProvider
    ) {}

    @Get()
    @HealthCheck()
    async check() {
        return this.health.check(await this.ccIndicator.getIndicators())
    }
}
