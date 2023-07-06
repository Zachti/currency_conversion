"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    log(message, ...optionalParams) {
        console.log(message, ...optionalParams);
    }
    debug(message, metadata, context) {
        console.debug(message, this.wrapLogMetadata({ metadata, context }));
    }
    warn(message, metadata, context) {
        console.warn(message, this.wrapLogMetadata({ metadata, context }));
    }
    info(message, metadata, context) {
        console.info(message, this.wrapLogMetadata({ metadata, context }));
    }
    error(message, metadata, error, context) {
        if (error instanceof Error && metadata) {
            metadata['error'] = {
                message: error.message,
                stack: error.stack,
                name: error.name,
            };
        }
        console.error(message, this.wrapLogMetadata({ metadata, context }));
    }
    wrapLogMetadata({ metadata, context, }) {
        return { metadata, context };
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=logger.js.map