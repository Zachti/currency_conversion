import {IsArray, IsNotEmpty, IsNumber, IsString, Validate} from "class-validator";
import { IsDateISO8601 } from "../../validators/IsDateISO8601";
import { ValidSourceValidator } from "../../validators/isValidSourceValidator";
import {IsDateBetween2010AndPresent} from '../../validators/isDateBetween2010AndPresent'

export class ConvertInputDto {
  @Validate(ValidSourceValidator)
  @IsNotEmpty()
  readonly source: string;

  @IsArray()
  @IsNotEmpty()
  readonly destination: string[];

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @Validate(IsDateISO8601)
  @Validate(IsDateBetween2010AndPresent, ["2010-01-01"])
  readonly date: string;
}
