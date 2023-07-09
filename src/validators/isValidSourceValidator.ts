import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { Currency } from "../constants/enums";

@ValidatorConstraint({ name: "validSource", async: false })
export class ValidSourceValidator implements ValidatorConstraintInterface {
  validate(source: any, args: ValidationArguments) {
    return Object.values(Currency).includes(source);
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid currency. Allowed values are: ${Object.values(Currency)
      .filter((v) => isNaN(Number(v)))
      .join(", ")}`;
  }
}
