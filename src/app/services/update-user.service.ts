import {CreateUser} from "./create-user.service";

export class UpdateUser extends CreateUser {
    static updateUser(input: string): UpdateUser {
    return Object.assign(new UpdateUser(), this.createUser(input));
}
}
