import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class IsDateISO8601 implements ValidatorConstraintInterface {
    validate(dateReceived: string): boolean;
    defaultMessage(args: ValidationArguments): string;
}
