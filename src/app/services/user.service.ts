import { User, UserInput } from '../models/user';
import { UsersBase } from '../usersBase';
import { CreateUser } from "./create-user.service";
import * as uuid from 'uuid';
import {NotFoundError, ValidationError} from "../models/errors";
import {NOT_FOUND_ERROR, USERID_INVALID} from "../messages";
import {UpdateUser} from "./update-user.service";

export class UserService {
    constructor(private base: UsersBase) {}
    async getAllUsers(): Promise<User[]> {
        return this.base.getAll();
    }

    async getOneUser(id: string): Promise<User> {
        return;
    }

    async createUser(input: string): Promise<User> {
        const body: UserInput =  CreateUser.createUser(input);
        return this.base.createUser(body);
    }
    async updateUser(id: string, input: string): Promise<User> {
        this.validateUserId(id);
        const body: UpdateUser = UpdateUser.updateUser(input);
        await this.findOne(id);
        const result = this.base.update(id, body);
        return result;
    }

    async deleteUser(id: string): Promise<any> {
        return;
    }

    validateUserId(id: string) {
        if (!uuid.validate(id)) {
            throw new ValidationError(USERID_INVALID)
        }
    }

    async findOne(id: string): Promise<User> {
        const user = await this.base.findOne(id);

        if (!user) {
            throw new NotFoundError(NOT_FOUND_ERROR);
        }
        return user;
    }

}
