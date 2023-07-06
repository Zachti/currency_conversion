export class CurrencyLayerError extends Error {
    code: number;

    constructor({ code, message }: { code: number, message: string }) {
        super(message);
        this.code = code;
        this.name = 'CurrencyLayerError';
    }
}