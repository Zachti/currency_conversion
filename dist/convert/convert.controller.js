"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const transformInterceptor_1 = require("../interceptors/transformInterceptor");
const convert_input_dto_1 = require("./dto/convert.input.dto");
const convert_service_1 = require("./convert.service");
const loggerProvider_1 = require("../logger/loggerProvider");
let ConvertController = exports.ConvertController = class ConvertController {
    constructor(convertService, logger) {
        this.convertService = convertService;
        this.logger = logger;
    }
    async convert(query) {
        this.logger.log("debug", "convert query", { query: JSON.stringify(query) });
        return this.convertService.convert(query);
    }
};
__decorate([
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [convert_input_dto_1.ConvertInputDto]),
    __metadata("design:returntype", Promise)
], ConvertController.prototype, "convert", null);
exports.ConvertController = ConvertController = __decorate([
    (0, common_1.UseInterceptors)(transformInterceptor_1.TransformInterceptor),
    (0, common_1.Controller)("convert"),
    __param(1, (0, common_1.Inject)(loggerProvider_1.Logger_Provider)),
    __metadata("design:paramtypes", [convert_service_1.ConvertService, Object])
], ConvertController);
//# sourceMappingURL=convert.controller.js.map