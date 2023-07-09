"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertModule = void 0;
const common_1 = require("@nestjs/common");
const convert_controller_1 = require("./convert.controller");
const convert_service_1 = require("./convert.service");
const currencyLayerModule_1 = require("../currencyLayer/currencyLayerModule");
const loggerProvider_1 = require("../logger/loggerProvider");
const currencyProvider_1 = require("../constants/currencyProvider");
let ConvertModule = exports.ConvertModule = class ConvertModule {
};
exports.ConvertModule = ConvertModule = __decorate([
    (0, common_1.Module)({
        imports: [currencyLayerModule_1.CurrencyLayerModule],
        controllers: [convert_controller_1.ConvertController],
        providers: [convert_service_1.ConvertService, loggerProvider_1.LoggerProvider, currencyProvider_1.CurrencyProvider],
        exports: [convert_service_1.ConvertService],
    })
], ConvertModule);
//# sourceMappingURL=convert.module.js.map