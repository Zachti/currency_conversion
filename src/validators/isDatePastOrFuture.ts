import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { DATE_MUST_BE_BETWEEN_2010_AND_PRESENT } from "./invalidConstants";

@ValidatorConstraint({ name: "isDateAfter", async: false })
export class IsDatePastOrFuture implements ValidatorConstraintInterface {
  validate(
    dateReceived: string,
    validationArguments: ValidationArguments
  ): boolean {
    const date = Date.parse(dateReceived);
    const validationDate = Date.parse(validationArguments.constraints[0]);
    return date > validationDate && date <= Date.now();
  }
  defaultMessage(args: ValidationArguments): string {
    return `${DATE_MUST_BE_BETWEEN_2010_AND_PRESENT}. input: ${args.value}`;
  }
}
