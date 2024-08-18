# Users service

A part of Forum App microservices

# Rabbitmq guide

### Producer queue:

- New user notification: `"new.user.created"`
- Send user data: `"get.user"`

### Consumer queue:

- `"new.user.created"`
