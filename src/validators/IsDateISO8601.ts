import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { DATE_MUST_BE_ISO8601 } from "./invalidConstants";

@ValidatorConstraint({ name: "isDateISO8601", async: false })
export class IsDateISO8601 implements ValidatorConstraintInterface {
  validate(dateReceived: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateReceived);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${DATE_MUST_BE_ISO8601}. input: ${args.value}`;
  }
}
