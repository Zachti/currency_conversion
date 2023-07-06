import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class ValidSourceValidator implements ValidatorConstraintInterface {
    validate(source: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
