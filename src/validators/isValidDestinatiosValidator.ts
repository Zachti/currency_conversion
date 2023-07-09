import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { Currency } from "../constants/enums";

@ValidatorConstraint({ name: "validSource", async: false })
export class ValidDestinationsValidator implements ValidatorConstraintInterface {
  validate(destinations: any , args: ValidationArguments) {
    return destinations.every(destination => Object.values(Currency).includes(destination));
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid destination currency. Allowed values are: ${Object.values(
      Currency
    ).join(", ")}`;
  }
}
