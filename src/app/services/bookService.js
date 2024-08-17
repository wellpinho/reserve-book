const { AppError } = require("../../shared");

const createBookService = ({ bookRepository }) => {
    if (!bookRepository) {
        throw new AppError('bookRepository is required');
    }

    return async ({ title, author, publicationDate, ISBN }) => {
        const checkParams = (title && author && publicationDate && ISBN);

        if(!checkParams) {
            throw new AppError('all params is required');
        }

        await bookRepository.create({ title, author, publicationDate, ISBN });

        return null;
    }
}

module.exports = {
    createBookService,
}