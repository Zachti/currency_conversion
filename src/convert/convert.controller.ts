import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { ConvertInputDto } from "./dto/convert.input.dto";
import { ConvertService } from "./convert.service";
import { LoggerProvider } from "../logger/logger";

@Controller("convert")
export class ConvertController {
  constructor(
    private readonly convertService: ConvertService,
    private readonly logger: LoggerProvider
  ) {}

  @UseInterceptors(CacheInterceptor)
  @Post()
  async convert(
    @Body(new ValidationPipe()) query: ConvertInputDto
  ): Promise<any> {
    this.logger.log("debug", "convert query", { query: JSON.stringify(query) });
    return this.convertService.convert(query);
  }
}
