import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { HealthController } from './health.controller'
import {CConvertorHealthIndicatorsProvider} from "./haelth-indicator.provider";

@Module({
    imports: [TerminusModule],
    providers: [CConvertorHealthIndicatorsProvider],
    controllers: [HealthController],
})
export class HealthModule {}
