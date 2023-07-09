import {
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
  @IsNotEmpty()
  readonly source: string;

  @IsArray()
  @IsNotEmpty()
  @Validate(ValidDestinationsValidator)
  readonly destinations: string[];

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @Validate(IsDateISO8601)
  @Validate(IsDatePastOrFuture, ["2010-01-01"])
  readonly date: string;
}
