import { User, UserInput } from '../models/user';
import { ValidationError } from '../models/errors';
import { INVALID_FORMAT } from '../messages';

export class UserConverterService {
    static createUserDto(input: string): UserInput {
        let userDto: UserInput;
        try {
            userDto = JSON.parse(input);
        } catch (err) {
            console.log('1 - ValidationError');
            throw new ValidationError(INVALID_FORMAT);
        }

        this.isValidUserBody(userDto);

        userDto.username = userDto.username.trim();
        userDto.hobbies.map((item) => item.trim());

        return userDto;
    }

    static isValidUserBody(userDto: UserInput | User): void {
        if (
            !(typeof userDto.username === 'string' &&
            typeof userDto.age === 'number' &&
            Array.isArray(userDto.hobbies) &&
            userDto.hobbies.length
                ? userDto.hobbies.every((item) => typeof item !== 'string')
                : true)
        ) {
            console.log('2 - ValidationError');
            throw new ValidationError(INVALID_FORMAT);
        }
        if (!userDto.username.trim()) {
            console.log('3 - ValidationError');
            throw new ValidationError(INVALID_FORMAT);
        }
    }
}
