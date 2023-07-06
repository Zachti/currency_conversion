"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateISO8601 = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants/constants");
let IsDateISO8601 = exports.IsDateISO8601 = class IsDateISO8601 {
    validate(dateReceived) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(dateReceived);
    }
    defaultMessage(args) {
        return `${constants_1.DATE_MUST_BE_ISO8601}. input: ${args.value}`;
    }
};
exports.IsDateISO8601 = IsDateISO8601 = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isDateISO8601', async: false })
], IsDateISO8601);
//# sourceMappingURL=IsDateISO8601.js.map