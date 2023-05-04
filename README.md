# Speakup API

## Description

This is a RESTful API for Speakup. Speakup is a blog application where user come un board to share experiences and post their opinions about shared experiences.

## Technologies

The following technologies are being used in this project:

- [TypeScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Postgresql](https://www.postgres.com/)
- [typeorm](https://www.typeorm.com/)
- [redis](https://www.docker.com/)

The following technologies will be be used in this project:
- [Kubernetes](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Docker](https://www.docker.com//)
- [Docker Compose](https://docs.docker.com/compose/)
- [RabbitMQ](https://expressjs.com/)
- [Jest](https://www.postgres.com/)
- [aws](https://www.typeorm.com/)


## Requirements

Before starting, you need to create a .env file in the root directory of the project, and provide the environment variables in .env.example file.
Kindly ensure that you are in the root directory before running the following commands.

## Note
Ensure you have the used technologies listed above installed on your local machine as this project is not being deployed in a cloud environment.


## Install Dependencies and Run the Application

```bash
yarn install
```

## Run migrations

```bash
yarn migration:generate && migration:up
```

## Start the Application
```bash
yarn dev
```

## Revert migrations
```bash
migration:up
```

## Key Features (At the time)
1. Users can create an account and login to the application
2. Users can reset and change password.

