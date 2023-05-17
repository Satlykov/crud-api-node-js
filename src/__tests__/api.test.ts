import { app } from '../app/app';
import supertest from 'supertest';
import { CreateUser } from '../app/services/create-user.service';
import { User } from '../app/models/user';
import { UpdateUser } from '../app/services/update-user.service';
import { INVALID_OPERATION, NOT_FOUND_ERROR } from '../app/messages';

const URL = '/api/users';
describe('Scenario #1: the all requests', () => {
    const objUser = {
        username: 'Anna',
        age: 30,
        hobbies: ['rock'],
    };
    const mockUser = Object.assign(new User(), objUser);

    it('should return empty array', async () => {
        const users = [];

        const res = await supertest(app).get(URL);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(users);
    });

    it('should create user', async () => {
        const user = mockUser;
        const userJSON = JSON.stringify(
            Object.assign(new CreateUser(), mockUser)
        );
        const res = await supertest(app).post(URL).send(userJSON);

        expect(res.statusCode).toBe(201);
        expect(res.body.id).not.toBe('');
        mockUser.id = res.body.id;
        expect(res.body).toEqual(user);
    });

    it('should get user', async () => {
        const user = mockUser;
        const id = mockUser.id;

        const res = await supertest(app).get(`${URL}/${id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user);
    });

    it('should update user', async () => {
        const user = mockUser;
        mockUser.username = 'Mary';
        mockUser.hobbies = ['sport'];
        const updateUserDto = Object.assign(new UpdateUser(), {
            username: 'Mary',
            age: 30,
            hobbies: ['sport'],
        });

        const res = await supertest(app)
            .put(`${URL}/${mockUser.id}`)
            .send(JSON.stringify(updateUserDto));

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(user);
    });

    it('should delete user', async () => {
        const id = mockUser.id;

        const res = await supertest(app).delete(`${URL}/${id}`);

        expect(res.statusCode).toBe(204);
    });

    it('should find no user', async () => {
        const id = mockUser.id;
        const message = { code: 404, message: NOT_FOUND_ERROR };

        const res = await supertest(app).get(`${URL}/${id}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.message).not.toBeUndefined;
        expect(res.body).toEqual(message);
    });
});

describe('Scenario #2: the operations when errors message is the NOT_FOUND_ERROR', () => {
    const objUser = {
        id: 'd9c5171b-6e3b-4e98-b306-30ab226d2162',
        username: 'Anna',
        age: 30,
        hobbies: ['rock'],
    };
    const mockUser = Object.assign(new User(), objUser);

    it('should return 404 on find non-exist user', async () => {
        const id = mockUser.id;
        const message = { code: 404, message: NOT_FOUND_ERROR };

        const res = await supertest(app).get(`${URL}/${id}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(message);
    });

    it('should return 404 on delete non-exist user', async () => {
        const id = mockUser.id;
        const message = { code: 404, message: NOT_FOUND_ERROR };

        const res = await supertest(app).delete(`${URL}/${id}`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(message);
    });

    it('should return 404 on get non-exist endpoint', async () => {
        const id = mockUser.id;
        const message = { code: 404, message: NOT_FOUND_ERROR };

        const res = await supertest(app).get(`${URL}/${id}/wrong`);

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual(message);
    });
});

describe('Scenario #3: the operations when errors message is the INVALID_OPERATION', () => {
    it('should return 400 on wrong id format for find user', async () => {
        const id = 'wrong_id';
        const message = { code: 400, message: INVALID_OPERATION };

        const res = await supertest(app).get(`${URL}/${id}`);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(message);
    });

    it('should return 400 on wrong id format for update user', async () => {
        const id = 'wrong_id';
        const message = { code: 400, message: INVALID_OPERATION };

        const res = await supertest(app)
            .put(`${URL}/${id}`)
            .send(JSON.stringify({}));

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(message);
    });

    it('should return 400 on wrong id format for delete user', async () => {
        const id = 'wrong_id';
        const message = { code: 400, message: INVALID_OPERATION };

        const res = await supertest(app).delete(`${URL}/${id}`);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(message);
    });
});
