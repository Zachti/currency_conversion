import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { destinationsCurrency } from "../constants/enums";

@ValidatorConstraint({ name: "validSource", async: false })
export class ValidDestinationsValidator
  implements ValidatorConstraintInterface
{
  validate(destinations: any, args: ValidationArguments) {
    return (
      destinations &&
      destinations.every((destination) =>
        Object.values(destinationsCurrency).includes(destination)
      )
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid destination currency. Allowed values are: ${Object.values(
      destinationsCurrency
    ).join(", ")}`;
  }
}
