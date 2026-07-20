# TaskFlow - Todo Management System

A modern full-stack Todo Management application built with **Next.js**, **Laravel**, **PostgreSQL**, and **Laravel Sanctum**. The application allows users to securely manage their daily tasks with authentication, search, filtering, and status management.

---

## Features

### Authentication
- User Registration
- User Login
- Secure authentication using Laravel Sanctum
- Protected dashboard routes
- Logout functionality

### Todo Management
- Create new todos
- View all todos
- Update existing todos
- Delete todos
- Mark todos as Completed or Pending
- Search todos by title or description
- Filter todos by status

### Dashboard
- Responsive dashboard
- Task statistics
  - Total Tasks
  - Pending Tasks
  - Completed Tasks
  - Completion Percentage
- Professional UI built with Tailwind CSS

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Laravel 12
- Laravel Sanctum
- REST API

### Database
- PostgreSQL

---

## Project Structure

```
todo-app/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── ...
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── app/Http/
│   └── ...
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/AlokaSenevirathne/todo-app.git

cd todo-app
```

---

## Backend Setup

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
composer install
```

Copy environment file

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Configure your PostgreSQL database inside `.env`

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_app
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

Run migrations

```bash
php artisan migrate
```

Start Laravel server

```bash
php artisan serve
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register` | Register User |
| POST | `/api/login` | Login User |
| POST | `/api/logout` | Logout User |

---

### Todos

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/todos` | Get All Todos |
| POST | `/api/todos` | Create Todo |
| PUT | `/api/todos/{id}` | Update Todo |
| DELETE | `/api/todos/{id}` | Delete Todo |
| PATCH | `/api/todos/{id}/complete` | Mark Completed |
| PATCH | `/api/todos/{id}/pending` | Mark Pending |

---

## Search

Search todos using

```
GET /api/todos?search=assignment
```

---

## Filter

Filter by status

```
GET /api/todos?status=pending
```

or

```
GET /api/todos?status=completed
```

---




## Security

- Passwords are securely hashed.
- Authentication is handled using Laravel Sanctum.
- Protected API routes require valid Bearer tokens.
- Input validation implemented using Laravel Form Requests.

---

## Author

**Aloka Senevirathne**

- SLIIT Undergraduate
- BSc (Hons) Information Technology

GitHub:
https://github.com/AlokaSenevirathne

---

## License

This project is developed for educational and internship assessment purposes.