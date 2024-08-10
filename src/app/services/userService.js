const { AppError } = require("../../shared/errors/AppError");

const createUserService = ({ userRepository }) => {
    if (!userRepository) {
        throw new AppError('userRepository is required');
    }

    // useCase recebe o DTO
    return async ({ username, CPF, email, address, phone }) => {
        const checkParams = (username && CPF && address && phone);

        if(!checkParams) {
            throw new AppError('all params is required');
        }

        // Repassa o DTO para o repository
        await userRepository.create({
            username, CPF, email, address, phone 
        });
    };
}

module.exports = createUserService