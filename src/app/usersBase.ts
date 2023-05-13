import { EventEmitter } from 'events';
import { User, UserInput } from './models/user';
import { v4 } from 'uuid';
export class UsersBase extends EventEmitter {
    private readonly users: User[] = [];
    async getAll(): Promise<User[]> {
        return new Promise((resolve) => {
            resolve(this.users);
        });
    }

    async createUser(userData: UserInput): Promise<User> {
        return new Promise((resolve) => {
            const user = Object.assign(new User(), { id: v4(), ...userData });
            this.users.push(user);
            resolve(user);
        });
    }
}
