export interface Logger {
  log(message: any, ...optionalParams: any[]): void;
  debug(
    message: string,
    metadata?: Record<string, any>,
    context?: string
  ): void;
  warn(message: string, metadata?: Record<string, any>, context?: string): void;
  info(message: string, metadata?: Record<string, any>, context?: string): void;
  error(
    message: string,
    metadata?: Record<string, any>,
    error?: unknown,
    context?: string
  ): void;
}

export class LoggerProvider implements Logger {
  log(message: any, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams);
  }

  debug(
    message: string,
    metadata?: Record<string, any>,
    context?: string
  ): void {
    console.debug(message, this.wrapLogMetadata({ metadata, context }));
  }

  warn(
    message: string,
    metadata?: Record<string, any>,
    context?: string
  ): void {
    console.warn(message, this.wrapLogMetadata({ metadata, context }));
  }

  info(
    message: string,
    metadata?: Record<string, any>,
    context?: string
  ): void {
    console.info(message, this.wrapLogMetadata({ metadata, context }));
  }

  error(
    message: string,
    metadata?: Record<string, any>,
    error?: unknown,
    context?: string
  ): void {
    if (error instanceof Error && metadata) {
      metadata["error"] = {
        message: error.message,
        stack: error.stack,
        name: error.name,
      };
    }
    console.error(message, this.wrapLogMetadata({ metadata, context }));
  }

  private wrapLogMetadata({
    metadata,
    context,
  }: {
    metadata?: Record<string, any>;
    context?: string;
  }): any {
    return { metadata, context };
  }
}
