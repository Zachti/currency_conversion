import { ConvertInputDto } from "./dto/convert.input.dto";
import { Cache } from "cache-manager";
import { conversionOutput } from "./interfaces/conversion.interfaces";
import { Logger } from "../logger/logger";
import { ExternalCurrencyClient } from "../currencyLayer/currencyLayerClient.interface";
export declare class ConvertService {
    private readonly cacheManager;
    private readonly client;
    private readonly logger;
    constructor(cacheManager: Cache, client: ExternalCurrencyClient, logger: Logger);
    convert(query: ConvertInputDto): Promise<conversionOutput[]>;
    private fetchExchangeRates;
    private static Conversion;
    private fetchFromExternal;
    private generateCacheKey;
}
