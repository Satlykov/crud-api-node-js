import { IncomingMessage, ServerResponse } from 'http';
import {
    INVALID_OPERATION,
    NOT_FOUND_ERROR,
    UNEXPECTED_ERROR,
    UNSUPPORTED_OPERATION,
} from './messages';
import { NotFoundError, ValidationError } from './models/errors';
import { UserService } from './services/user.service';
import { UsersBase } from './usersBase';

const userBase = new UsersBase();
const userService = new UserService(userBase);
export const requestListener = async (
    message: IncomingMessage,
    response: ServerResponse
) => {
    response.setHeader('Content-Type', 'application/json');

    const host = message.headers.host;
    const [api, users, userId, ...rest] = message.url
        .split('/')
        .filter(Boolean);

    console.log(
        'Host:',
        host + ';',
        'Is api:',
        (api === 'api') + ';',
        'Is users:',
        (users === 'users') + ';',
        'Id:',
        userId + ';',
        'Is have rest params:',
        !!rest.length + ';'
    );

    const body: Buffer[] = [];
    for await (const chunk of message) {
        body.push(chunk);
    }
    const requestBody = Buffer.concat(body).toString();

    const isCorrectBaseUrl = () =>
        api === 'api' && users === 'users' && !rest.length;
    const isGetOneOrAllUsers = (id?: string) =>
        id ? userService.getOneUser(userId) : userService.getAllUsers();

    if (isCorrectBaseUrl()) {
        let result;
        let statusCode = 200;

        try {
            switch (message.method) {
                case 'GET':
                    result = await isGetOneOrAllUsers(userId);
                    break;
                case 'POST':
                    result = await userService.createUser(requestBody);
                    statusCode = 201;
                    break;
                case 'PUT':
                    result = await userService.updateUser(userId, requestBody);
                    break;
                case 'DELETE':
                    result = await userService.deleteUser(userId);
                    statusCode = 204;
                    break;
                default:
                    throw new Error(UNSUPPORTED_OPERATION);
            }
        } catch (err: any) {
            let errMessage;
            switch (true) {
                case err instanceof ValidationError:
                    statusCode = 400;
                    errMessage = INVALID_OPERATION;
                    break;
                case err instanceof NotFoundError:
                    statusCode = 404;
                    errMessage = NOT_FOUND_ERROR;
                    break;
                default:
                    statusCode = 500;
                    errMessage = UNEXPECTED_ERROR;
            }
            result = { code: statusCode, message: errMessage };
        }
        response.writeHead(statusCode);
        response.end(JSON.stringify(result));
    } else {
        response.writeHead(404);
        response.end(JSON.stringify({ code: 404, message: NOT_FOUND_ERROR }));
    }
};
