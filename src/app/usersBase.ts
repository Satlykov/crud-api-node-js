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

    async update(id: string, input: Partial<User>): Promise<User> {
        return new Promise((resolve) => {
            const user = async () =>
                Object.assign(await this.findOne(id), input);
            resolve(user());
        });
    }

    async findOne(id: string): Promise<User> {
        return new Promise((resolve) => {
            resolve(this.users.filter((item) => item.id === id)[0]);
        });
    }

    async deleteUser(id: string): Promise<User> {
        return new Promise((resolve) => {
            const index = this.users.findIndex((item) => item.id === id);
            if (index != -1) {
                const user = this.users.splice(index, 1)[0];
                resolve(user);
            }

            resolve(undefined);
        })
    }
}
