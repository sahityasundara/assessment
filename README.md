# SDE Intern – Backend Assessment (Nest.js)

This project is a backend API built using **Nest.js**, **PostgreSQL**, **TypeORM**, and **JWT Authentication**, as required for the SDE Intern Backend assessment.

---

## 🚀 Features

- Nest.js backend API
- PostgreSQL database using Docker
- TypeORM ORM entities & relations
- CRUD endpoints (Create, Read, Update, Delete)
- JWT authentication (register + login)
- Authorization (only owner can update/delete items)
- DTO validation with class-validator
- Central error handling using Nest exceptions
- Unit tests (Jest)
- Dockerized setup (`docker-compose`)
- Clean folder structure

---

## 🛠 Tech Stack

- Node.js
- Nest.js
- PostgreSQL
- TypeORM
- Passport + JWT
- Docker / Docker Compose
- Jest (unit testing)

---

## 🐳 Run the project (Docker)

### Prerequisites

- Install Docker Desktop  
https://www.docker.com/products/docker-desktop/

### Start the project

```bash
docker-compose up --build
The API will be available at:

http://localhost:3000

🔐 Authentication Endpoints
Register
POST /auth/register


Body:

{
  "email": "test@test.com",
  "password": "password123"
}

Login
POST /auth/login


Body:

{
  "email": "test@test.com",
  "password": "password123"
}


Response:

{
  "access_token": "..."
}


Use the token in requests:

Authorization: Bearer <access_token>

🧩 CRUD Endpoints (Items)
Get all
GET /items

Get one
GET /items/:id

Create (requires token)
POST /items


Body:

{
  "name": "Laptop"
}

Update (requires owner)
PATCH /items/:id

Delete (requires owner)
DELETE /items/:id

🧪 Unit Tests

Run unit tests:

npm test

📁 Folder Structure
src/
 ├─ auth/
 ├─ users/
 ├─ items/
 ├─ common/
 ├─ main.ts
 └─ app.module.ts
