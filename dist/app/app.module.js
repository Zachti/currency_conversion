"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const convert_module_1 = require("../convert/convert.module");
const convert_controller_1 = require("../convert/convert.controller");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const currencyLayerModule_1 = require("../currencyLayer/currencyLayerModule");
const loggerProvider_1 = require("../logger/loggerProvider");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            convert_module_1.ConvertModule,
            currencyLayerModule_1.CurrencyLayerModule,
        ],
        controllers: [app_controller_1.AppController, convert_controller_1.ConvertController],
        providers: [app_service_1.AppService, loggerProvider_1.LoggerProvider]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map