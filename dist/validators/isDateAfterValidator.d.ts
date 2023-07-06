import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsDateAfter implements ValidatorConstraintInterface {
    validate(dateReceived: string, validationArguments: ValidationArguments): boolean;
}
