const { AppError } = require("../../shared/errors/AppError");

const createUserService = ({ userRepository }) => {
    if (!userRepository) {
        throw new AppError('userRepository is required');
    }

    // useCase recebe o DTO
    return async ({ username, socialId, email, address, phone }) => {
        // Repassa o DTO para o repository
        await userRepository.create({
            username, socialId, email, address, phone 
        });
    };
}

module.exports = createUserService