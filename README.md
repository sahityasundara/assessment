# Nest.js SDE Intern Assessment Backend

This is a backend API built with **Nest.js**, **TypeORM**, **PostgreSQL**, and **JWT authentication**.

## Features

- User registration & login (JWT)
- CRUD for `Item` entity
- Ownership-based authorization (only owner can update/delete)
- Input validation using `class-validator`
- Centralized error handling through Nest exceptions
- PostgreSQL + TypeORM for persistence
- Unit tests using Jest

## Running with Docker (recommended)

```bash
docker-compose up --build
```

The API will be available at `http://localhost:3000`.

## Example endpoints

- `POST /auth/register`
- `POST /auth/login`
- `GET /items`
- `GET /items/:id`
- `POST /items` (auth required)
- `PATCH /items/:id` (auth + owner required)
- `DELETE /items/:id` (auth + owner required)
