const {createUserService, getUserService} = require("../../../app/services/userService");
const { AppError } = require("../../../shared");

describe('Services User', () => {
    const userRepository = {
        create: jest.fn(),
        userExists: jest.fn(),
        emailExists: jest.fn(),
        getUser: jest.fn(),
    }

    it('should create an user successfully', async () => {
        // Given
        const userDto = {
            username: 'test',
            CPF: '123',
            email: 'test@example.com',
            address: 'test street',
            phone: '1234567890'
        };

        userRepository.userExists.mockResolvedValue(false)

        // When
        const user = createUserService({ userRepository });
        const result = await user(userDto);

        // Then
        expect(result).toBeNull;
        expect(userRepository.create).toHaveBeenCalledWith(userDto);
        expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should receive an throw AppError if one or more param required is not informed', async () => {
        // When
        const user = createUserService({ userRepository });
        const result = await user({});
        
        // Then
        // quando for uma execução asyncrona precisamos usar await com rejects do expecte
        expect(result.error).toStrictEqual('all params is required');
    });

    it('should receive an throw AppError if userRepository not informed', async () => {
        expect(() => createUserService({})).toThrow(new AppError('userRepository is required'));
    });

    it('should receive an throw AppError if user already exists', async () => {
        //given
        const userDto = {
            username: 'test',
            CPF: '123_CPF_valido',
            email: 'email_já_cadastrado@example.com',
            address: 'test street',
            phone: '1234567890'
        };

        userRepository.userExists.mockResolvedValue(false)
        userRepository.emailExists.mockResolvedValue(true)

        // When
        const user = createUserService({ userRepository });
        const response = await user(userDto);

        // Then
        expect(response.success).toBeNull;
        expect(response.error).toStrictEqual({ message: 'email already exists' });
        expect(userRepository.emailExists).toHaveBeenCalledWith(userDto.email);
        expect(userRepository.emailExists).toHaveBeenCalledTimes(1);
    });

    it('should receive an user if already exists', async () => {
        //given
        const cpf = 'CPF_CADASTRADO';

        // expected
        const expected = {
            username: 'test',
            CPF: 'CPF_CADASTRADO',
            email: 'email_já_cadastrado@example.com',
            address: 'test street',
            phone: '1234567890'
        }

        userRepository.getUser.mockResolvedValue(expected);

        // When
        const user = getUserService({ userRepository });
        const response = await user(cpf);

        // Then
        expect(response.success).toStrictEqual(expected);
        expect(response).toHaveBeenCalled(1);
    });

    it('should receive empty array if user not exists', async () => {
        //given
        const cpf = 'CPF_CADASTRADO';

        // expected
        userRepository.getUser.mockResolvedValue(null);

        // When
        const user = getUserService({ userRepository });
        const response = await user(cpf);

        // Then
        expect(response.success).toBeNull;
    });
});