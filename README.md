<h1 align="center">Slooze Commodities backend API</h1>

<div align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

<br />

## 📖 Overview

This is the Official NestJS Backend API for the **Slooze Commodities Management System Challenge**, proudly created and implemented by me!

This API serves robust GraphQL endpoints to power the frontend interface. It is secured using passport-jwt strategies and leverages Prisma ORM to communicate with a PostgreSQL database.

## ✨ Features Implemented

### 1️⃣ Authentication & Security
- Complete JWT-based Authentication workflow (`POST /auth/login`).
- Passwords fully encrypted via `bcrypt`.
- Custom **GraphQL Execution Guards** (`@UseGuards(GqlAuthGuard)`) to strictly verify Bearer Tokens.

### 2️⃣ Role-Based Access Control (RBAC)
- Strict access verification mapping authenticated users to their privileges (`MANAGER`, `STORE_KEEPER`).
- Granular Resolver protections preventing unauthorized access natively on the backend.

### 3️⃣ Commodities Data Management
- Exposes efficient GraphQL Queries (`products`) to stream data to Apollo Client.
- Supports Create, Read, and Update mutations for inventory scaling.
- Automated Prisma Seeding mechanism to populate the database effortlessly.

---

## 🛠 Project Setup (Local)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shaiksumaiah/slooze-backend.git
   cd slooze-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the Environment:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/slooze"
   JWT_SECRET="your_ultra_secure_secret_key"
   PORT=5822
   ```

4. **Initialize the Database (Prisma):**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Start the API:**
   ```bash
   # Development watch mode
   npm run start:dev
   ```

---

## 🚀 How to Deploy to Render

This project includes a `render.yaml` Blueprint configuration, meaning deployment is completely automated!

1. Push your code to GitHub.
2. Log into [Render.com](https://render.com).
3. Click **New** -> **Blueprint**.
4. Connect this GitHub repository.
5. Render will automatically:
   - Identify it as a Node.js project.
   - Run `npx prisma generate` & `npm run build`.
   - Provision your PostgreSQL database instance automatically.
6. Click **Apply** and wait for the "Live" status.

---

<div align="center">
  <p>Built with ❤️ and strictly following all architecture requirements.</p>
</div>
