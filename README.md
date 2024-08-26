# Users service

A part of Forum App microservices

### Features

- User input validation by [ZOD](https://zod.dev/)
- User Authentication by [Bcrypt](https://www.npmjs.com/package/bcrypt)
- User Authorization Token rotation by [JWT](https://jwt.io/)
- Event bus by [RabbitMQ](https://www.rabbitmq.com/)
- Code linter by [EsLint](https://eslint.org/)
- Git hook by [Husky](https://typicode.github.io/husky/)

# Rabbitmq guide

### Producer queue:

- Notifications: `"newUserCreated"`
- User data: `"getUserData"`

### Consumer queue:

- `"newUserCreated"`
- `"newThreadCreated"`
- `"newReplyCreated"`
