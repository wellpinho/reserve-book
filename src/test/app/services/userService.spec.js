const createUserService = require("../../../app/services/userService");
const { AppError } = require("../../../shared/errors/AppError");

describe('Services User', () => {
    const userRepository = {
        create: jest.fn(),
        userExists: jest.fn()
    }

    userRepository.userExists.mockResolvedValue(true);

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
        expect(result).toStrictEqual(undefined);
        expect(userRepository.create).toHaveBeenCalledWith(userDto);
        expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should receive an throw AppError if one or more param required is not informed', async () => {
        // When
        const user = createUserService({ userRepository });

        // Then
        // quando for uma execução asyncrona precisamos usar await com rejects do expecte
        await expect(() => user({})).rejects.toThrow(new AppError('all params is required'));
    });

    it('should receive an throw AppError if userRepository not informed', async () => {
        expect(() => createUserService({})).toThrow(new AppError('userRepository is required'));
    });

    it('should receive an throw AppError if user already exists', async () => {
        //given
        const userDto = {
            username: 'test',
            CPF: '123_CPF_já_cadastrado',
            email: 'test@example.com',
            address: 'test street',
            phone: '1234567890'
        };

        userRepository.userExists.mockResolvedValue(true)

        // When
        const user = createUserService({ userRepository });

        // Then
        await expect(() => user(userDto)).rejects.toThrow(new AppError('user already exists'));
    });
});