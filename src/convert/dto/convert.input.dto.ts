import {IsArray, IsNumber, IsString, Validate} from 'class-validator';
import { dateMessage2010 } from '../../constants/constants';
import { IsDateAfter } from '../../validators/isDateAfterValidator';
import { IsDateISO8601 } from '../../validators/IsDateISO8601';
import { IsDateIsPastOrPresent } from '../../validators/IsDateIsPastOrPresent';
import {ValidSourceValidator} from '../../validators/isValidSourceValidator'
export class ConvertInputDto {

  @Validate(ValidSourceValidator)
  readonly source: string;

  @IsArray()
  readonly destination: string[];

  @IsNumber()
  readonly amount: number;

  @IsString()
  @Validate(IsDateISO8601)
  @Validate(IsDateIsPastOrPresent)
  @Validate(IsDateAfter, ['2010-01-01'], { message: dateMessage2010 })
  readonly date: string;
}
