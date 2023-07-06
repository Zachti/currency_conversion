import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateAfter', async: false })
export class IsDateAfter implements ValidatorConstraintInterface {
  validate(
    dateReceived: string,
    validationArguments: ValidationArguments,
  ): boolean {
    const milliseconds = Date.parse(dateReceived);
    const validationInMilliseconds = Date.parse(validationArguments.constraints[0]);
    return milliseconds > validationInMilliseconds;
  }
}
