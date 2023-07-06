import { ConvertInputDto } from './dto/convert.input.dto';
import { ConvertService } from './convert.service';
import { Logger } from '../logger/logger';
export declare class ConvertController {
    private readonly convertService;
    private readonly logger;
    constructor(convertService: ConvertService, logger: Logger);
    convert(query: ConvertInputDto): Promise<any>;
}
