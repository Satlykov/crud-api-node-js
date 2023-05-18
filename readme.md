# CRUD API task

Node.js with TypeScript. 

Assignment: CRUD API: [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

Scoring: CRUD API: [here](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md)

## How to install ✨

Clone and install packages

```
npm i
```
## How to run 🏃‍♂️

Run the application in development mode

```
npm run start:dev
```

Run the application in production mode

```
npm run start:prod
```

Run tests scenarios for API

```
npm test
```
or in watch mode
```
npm test:watch
```

The CRUD haven't the cluster mode with the load balancer. 😥


## API 🗨
### Important: POST and PUT requests to send with JSON body, please.

Implemented endpoint: `api/users`

`GET api/users` - to get all users

`GET api/users/${userId}` - to get user by id (uuid)

`POST api/users` - to create record about new user and store it in database

`PUT api/users/${userId}` - to update existing user (**all fields required**)

`DELETE api/users/${userId}` - to delete existing user from database


### User's mandratory fields

`username` — user's name (string, **required**)

`age` — user's age (number, **required**)

`hobbies` — user's hobbies (array of strings or empty array, **required**)


## Thank you for using it! 😉
