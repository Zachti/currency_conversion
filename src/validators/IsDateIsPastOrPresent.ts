import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DATE_CANNOT_BE_FUTURE } from '../constants/constants';

@ValidatorConstraint({ name: 'isDateIsPastOrPresent', async: false })
export class IsDateIsPastOrPresent implements ValidatorConstraintInterface {
  validate(
    dateReceived: string,
    validationArguments: ValidationArguments,
  ): boolean {
    const date = Date.parse(dateReceived);
    return date <= Date.now();
  }

  defaultMessage(args: ValidationArguments): string {
    return `${DATE_CANNOT_BE_FUTURE}. input: ${args.value}`;
  }
}
