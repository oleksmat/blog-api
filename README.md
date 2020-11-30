Blog API
========

[Task Requirements](https://github.com/AlexOzForge/nestjs-task)


## Description

REST API with JWT Authentication.
 * `/auth` - authentication routes
   * `POST /auth/signin` - username & password -> token
   * `POST /auth/signup` - username, password, first_name & last_name -> token
   * `POST /auth/signout`
 * `/posts` - data routes (authenticated)
   * `POST /posts` - create post
   * `GET /posts` - get posts
   * `GET /posts/:id` - get posts by id
   * `PUT /posts/:id` -  update post
   * `DELETE /posts/:id` - delete post

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
