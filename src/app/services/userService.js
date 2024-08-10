const { AppError } = require("../../shared/errors/AppError");

const createUserService = ({ userRepository }) => {
    if (!userRepository) {
        throw new AppError('userRepository is required');
    }

    // useCase recebe o DTO
    return async ({ username, CPF, email, address, phone }) => {
        // Sempre devemos checar os campos antes de fazer busca no banco
        // imagine buscar um user no banco pelo CPF sendo que o CPF nem foi informado no parâmetro?
        const checkParams = (username && CPF && address && phone);
        if(!checkParams) {
            throw new AppError('all params is required');
        }

        const checkUserExists = await userRepository.userExists(CPF);
        if (checkUserExists) {
            throw new AppError('user already exists');
        }

        // Repassa o DTO para o repository
        await userRepository.create({
            username, CPF, email, address, phone 
        });
    };
}

module.exports = createUserService