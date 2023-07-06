"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidSourceValidator = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../constants/enums");
let ValidSourceValidator = exports.ValidSourceValidator = class ValidSourceValidator {
    validate(source, args) {
        console.log(source);
        return Object.values(enums_1.Currency).includes(source);
    }
    defaultMessage(args) {
        return `Invalid currency. Allowed values are: ${Object.values(enums_1.Currency).join(', ')}`;
    }
};
exports.ValidSourceValidator = ValidSourceValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'validSource', async: false })
], ValidSourceValidator);
//# sourceMappingURL=isValidSourceValidator.js.map