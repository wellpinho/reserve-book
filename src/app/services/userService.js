const createUserService = ({ userRepository }) => {
    // useCase recebe o DTO
    return async ({ username, socialId, email, address, phone }) => {
        // Repassa o DTO para o repository
        await userRepository.create({
            username, socialId, email, address, phone 
        });
    };
}

module.exports = createUserService