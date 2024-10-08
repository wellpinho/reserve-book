const { AppError, Either } = require("../../shared");
const { tryCatch } = require("../../utils");

const getUserService = ({ userRepository }) => {
    if (!userRepository) {
        throw new AppError('userRepository is required');
    }

    return async (value) => {
        if(!value) {
            return Either.error('param is required');
        }

        const user = await tryCatch(userRepository.getUser(value));

        return Either.success(user);
    };
}

const createUserService = ({ userRepository }) => {
    if (!userRepository) {
        throw new AppError('userRepository is required');
    }

    return async ({ username, CPF, email, address, phone }) => {
        const checkParams = (username && CPF && address && phone);
        if(!checkParams) {
            return Either.error('all params is required');
        }

        const checkCpfExists = await userRepository.userExists(CPF);
        if (checkCpfExists) {
            return Either.error(Either.userExists('cpf'));
        }

        const checkEmailExists = await userRepository.emailExists(email);
        if (checkEmailExists) {
            return Either.error(Either.userExists('email'));
        }


        await userRepository.create({
            username, CPF, email, address, phone 
        });

        return Either.success(null);
    };
}

module.exports = {
    createUserService,
    getUserService,
}