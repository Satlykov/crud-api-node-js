import { ValidationError } from "../models/errors";
import { INVALID_FORMAT, INVALID_BODY } from "../messages";

export class CreateUser {
    username: string;
    age: number;
    hobbies: string[];

    static createUser(input: string): CreateUser {
        let userDto: CreateUser;
        try {
            userDto = JSON.parse(input);
        } catch (err) {
            console.log(err);
            throw new ValidationError(INVALID_FORMAT);
        }

        this.isValidUserBody(userDto);

        userDto.username = userDto.username.trim();
        userDto.hobbies.map((item) => item.trim());

        return userDto;
    }

    static isValidUserBody(userDto: CreateUser): void {
        if (
            !(typeof userDto.username === 'string' &&
            typeof userDto.age === 'number' &&
            Array.isArray(userDto.hobbies) &&
            userDto.hobbies.length
                ? userDto.hobbies.every((item) => typeof item !== 'string')
                : true)
        ) {
            throw new ValidationError(INVALID_BODY);
        }
        if (!userDto.username.trim()) {
            throw new ValidationError(INVALID_BODY);
        }
    }
}
