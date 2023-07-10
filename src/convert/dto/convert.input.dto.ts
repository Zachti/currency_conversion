import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from "class-validator";
import { IsDateISO8601 } from "../../validators/IsDateISO8601";
import { ValidDestinationsValidator } from "../../validators/isValidDestinatiosValidator";
import { IsDatePastOrFuture } from "../../validators/isDatePastOrFuture";

export class ConvertInputDto {
  @IsString()
  @IsNotEmpty()
  readonly source: string;

  @Validate(ValidDestinationsValidator)
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @IsArray()
  readonly destinations: string[];

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  @Validate(IsDateISO8601)
  @Validate(IsDatePastOrFuture, ["2010-01-01"])
  @IsString()
  readonly date: string;
}
