const createUserService = require("../../../app/services/userService");
const { AppError } = require("../../../shared/errors/AppError");

describe('Services User', () => {
    const userRepository = {
        create: jest.fn()
    }

    it('should create an user successfully', async () => {
        // Given
        const userDto = {
            username: 'test',
            socialId: '123',
            email: 'test@example.com',
            address: 'test street',
            phone: '1234567890'
        };

        // When
        const user = createUserService({ userRepository });
        const result = await user(userDto);

        // Then
        expect(result).toStrictEqual(undefined);
        expect(userRepository.create).toHaveBeenCalledWith(userDto);
        expect(userRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should receive an throw AppError if userRepository not informed', async () => {
        expect(() => createUserService({})).toThrow(new AppError('userRepository is required', 400));
    });
});