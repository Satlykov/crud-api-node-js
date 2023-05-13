import { User, UserInput } from '../models/user';
import { UserConverterService } from './user-converter.service';
import { UsersBase } from '../usersBase';

export class UserService {
    constructor(private base: UsersBase) {}
    async getAllUsers(): Promise<User[]> {
        return this.base.getAll();
    }

    async getOneUser(id: string): Promise<User> {
        return;
    }

    async createUser(input: string): Promise<User> {
        const body: UserInput = UserConverterService.createUserDto(input);
        return this.base.createUser(body);
    }
    async updateUser(id: string, body: any): Promise<User> {
        return;
    }

    async deleteUser(id: string): Promise<any> {
        return;
    }
}
