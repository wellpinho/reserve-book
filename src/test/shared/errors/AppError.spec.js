const { AppError } = require("../../../shared/errors/AppError");

describe('AppError', () => {
    it('check if AppError is stance of Error', () => {
        const appError = new AppError('error');

        expect(appError).toBeInstanceOf(Error);
    });

    it('should receive correctly message from AppError', () => {
        const message = 'Custom error message';
        const appError = new AppError(message);

        expect(appError.message).toBe(message);
    });
});