import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class IsDateIsPastOrPresent implements ValidatorConstraintInterface {
    validate(dateReceived: string, validationArguments: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
