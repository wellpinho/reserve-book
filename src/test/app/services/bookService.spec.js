const { createBookService } = require("../../../app/services/bookService");

describe('bookService', () => {
    it('should receive an throw AppError if bookRepository not informed', async () => {
        expect(() => createBookService({})).toThrow(new Error('bookRepository is required'));
    });

    describe('createBookService', () => {
        const bookRepository = {
            create: jest.fn(),
        };

        it('should create a book', async () => {
            // Given
            const book = { 
                title: 'Test', 
                author: 'Test', 
                publicationDate: new Date(), 
                ISBN: '123456789',
            };

            // When
            const bookService = createBookService({ bookRepository });
            const result = await bookService(book);

            // Then
            expect(result).toBeNull;
            expect(bookRepository.create).toHaveBeenCalledWith(book);
            expect(bookRepository.create).toHaveBeenCalledTimes(1);
        });

        it('should receive an throw AppError if all params not informed', async () => {
            const book = createBookService({ bookRepository });
            const error = await book({  title: 'Test', author: 'Test'});
            expect(error).toThrow(new Error('bookRepository is required'));
        });
    });

    describe('getBookService', () => {
        const bookRepository = {
            create: jest.fn(),
        };

        it('should create', async () => {});
    });
});