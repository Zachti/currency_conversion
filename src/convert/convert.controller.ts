import {Body, Controller, Post, UseInterceptors, Inject, ValidationPipe} from '@nestjs/common';
import {CacheInterceptor} from '@nestjs/cache-manager';
import {TransformInterceptor} from '../interceptors/transformInterceptor';
import {ConvertInputDto} from './dto/convert.input.dto';
import {ConvertService} from './convert.service';
import {Logger} from '../logger/logger'
import {Logger_Provider} from "../logger/loggerProvider";


@UseInterceptors(TransformInterceptor)
@Controller('convert')
export class ConvertController {
    constructor(
        private readonly convertService: ConvertService,
        @Inject(Logger_Provider)private readonly logger: Logger,
    ) {
    }

    @UseInterceptors(CacheInterceptor)
    @Post()
    async convert(@Body(new ValidationPipe()) query: ConvertInputDto): Promise<any> {
        this.logger.log('debug', 'convert query', {query: JSON.stringify(query)});
        return this.convertService.convert(query);
    }
}
