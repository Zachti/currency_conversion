export declare class CurrencyLayerError extends Error {
    code: number;
    constructor({ code, message }: {
        code: number;
        message: string;
    });
}
