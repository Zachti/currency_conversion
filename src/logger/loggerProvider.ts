import {ConsoleLogger} from "./logger";

export const LoggerProvider =  {
    provide: 'logger',
    useClass: ConsoleLogger
}
export const Logger_Provider = 'logger';
