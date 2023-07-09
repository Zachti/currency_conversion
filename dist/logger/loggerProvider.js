"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger_Provider = exports.LoggerProvider = void 0;
const logger_1 = require("./logger");
exports.LoggerProvider = {
    provide: "logger",
    useClass: logger_1.ConsoleLogger,
};
exports.Logger_Provider = "logger";
//# sourceMappingURL=loggerProvider.js.map