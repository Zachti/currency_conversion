export interface Logger {
    log(message: any, ...optionalParams: any[]): void;
    debug(message: string, metadata?: Record<string, any>, context?: string): void;
    warn(message: string, metadata?: Record<string, any>, context?: string): void;
    info(message: string, metadata?: Record<string, any>, context?: string): void;
    error(message: string, metadata?: Record<string, any>, error?: unknown, context?: string): void;
}
export declare class ConsoleLogger implements Logger {
    log(message: any, ...optionalParams: any[]): void;
    debug(message: string, metadata?: Record<string, any>, context?: string): void;
    warn(message: string, metadata?: Record<string, any>, context?: string): void;
    info(message: string, metadata?: Record<string, any>, context?: string): void;
    error(message: string, metadata?: Record<string, any>, error?: unknown, context?: string): void;
    private wrapLogMetadata;
}
