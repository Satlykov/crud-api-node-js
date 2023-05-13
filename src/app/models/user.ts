export class UserInput {
    username: string;
    age: number;
    hobbies: string[];
}

export class User extends UserInput {
    id: string;
}
