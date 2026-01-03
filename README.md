# Multi-Tenant SaaS Project & Task Management Platform

## Overview

A full‑stack **multi‑tenant SaaS** application that allows multiple organizations (tenants) to securely manage their own projects and tasks in complete isolation.

This project was built to understand how **real production SaaS systems** handle:

* Tenant isolation
* Authentication & authorization
* Role‑based access control (RBAC)
* Secure data access across organizations

> While building this system, I encountered real‑world issues such as JWT validation errors, incorrect route mounting, Docker caching pitfalls, and frontend–backend synchronization bugs. Debugging these problems provided hands‑on experience with production‑grade system behavior beyond simple CRUD apps.

Rather than prioritizing UI polish, this project emphasizes:

* Secure multi‑tenancy
* Clean, scalable API design
* Strict authorization rules
* Consistent backend–frontend integration
* Production‑style debugging and fixes

---

## Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL (strict relational integrity)
* **Frontend:** React
* **Auth:** JWT (JSON Web Tokens)
* **DevOps:** Docker, Docker Compose
* **HTTP Client:** Axios

---

## Authentication & Authorization

* JWT‑based authentication for all users
* Each user belongs to exactly one tenant (organization)

### Supported Roles

* `TENANT_ADMIN`
* `TENANT_USER`

### Role‑Based Rules

* Only `TENANT_ADMIN` can create or delete projects
* `TENANT_ADMIN` can delete any task
* `TENANT_USER` can manage only tasks they are permitted to access
* Every protected request is validated via JWT and tenant guards

JWT verification ensures:

* Expired tokens are rejected
* Cross‑tenant access is impossible

---

## Multi‑Tenancy Architecture

This project uses a **shared database with tenant‑isolated data** model.

### Core Principles

* Every major table includes a `tenant_id`
* `tenant_id` is extracted from the JWT
* All database queries are scoped by `tenant_id`
* Cross‑tenant access is strictly blocked at the query level

### Result

* Tenants can never see or modify each other’s data
* System behavior mirrors real SaaS platforms

---

## Code Structure

### Backend

```
Routes → Middleware → Controllers → Database
```

* **Routes:** Define API endpoints
* **Middleware:** Authentication, authorization, tenant validation
* **Controllers:** Business logic
* **Database:** Enforces integrity via constraints and foreign keys

### Frontend

* Pages manage UI logic
* Centralized API layer configures Axios and injects JWTs
* Protected routes restrict access based on auth state and role

---

## Database Design

### Core Entities

* Tenant
* User
* Project
* Task
* AuditLog

### Key Design Decisions

* All entities include `tenant_id`
* UUIDs used for all primary keys
* Audit logs track critical actions (e.g., task creation/deletion)
* Strict foreign keys prevent orphaned records

---

## Project Management

Projects are tenant‑scoped and include:

* `name`
* `description`
* `status`
* `created_by`
* `tenant_id`

### Supported Operations

* Create project (`TENANT_ADMIN`)
* List tenant‑specific projects
* View project details
* Update project status
* Delete project (`TENANT_ADMIN`)

> Project limits per tenant are enforced at the database level.

---

## Task Management

Tasks are always scoped to both a **project** and a **tenant**.

### Task Fields

* `title`
* `status` (`todo`, `in_progress`, `completed`)
* `priority`
* `project_id`
* `tenant_id`

### Supported Operations

* Create task
* View tasks by project
* Update task status via `PATCH`
* Delete task (`TENANT_ADMIN` only)

Task creation returns the created record immediately to prevent UI race conditions.

---

## Frontend Features

Built with React, focusing on correctness and UX clarity:

* Protected routes
* Clean state management
* Real‑time UI updates without page reloads

### Key UI Capabilities

* Tenant‑based login
* Projects list view
* Project details with tasks
* Inline task creation
* Dropdown task status updates
* Role‑aware UI (admin‑only delete actions)

---

## Dockerized Development

The entire stack runs via **Docker Compose**.

### Services

* Backend API
* PostgreSQL database
* Frontend React app

Docker enables:

* Consistent local environments
* Production‑like behavior
* Debugging of real container‑level issues

---

## Setup Instructions

### Prerequisites

* Node.js v18+
* Docker & Docker Compose

### Run Locally

1. Clone the repository
2. Start all services:

   ```bash
   docker-compose up -d
   ```
3. Backend: [http://localhost:5000](http://localhost:5000)
4. Frontend: [http://localhost:3000](http://localhost:3000)
5. Login using seeded admin credentials or register a new tenant

---

## API Overview

### Auth

* `POST /api/auth/login`
* `POST /api/auth/register-tenant`

### Projects

* `GET /api/projects`
* `POST /api/projects`
* `GET /api/projects/:projectId`
* `PUT /api/projects/:projectId`
* `DELETE /api/projects/:projectId`

### Tasks

* `GET /api/projects/:projectId/tasks`
* `POST /api/projects/:projectId/tasks`
* `PATCH /api/tasks/:taskId/status`
* `DELETE /api/tasks/:taskId`

---

## Notes & Limitations

* No email service integration
* Minimal UI styling (functionality‑first)
* No refresh tokens (access token only)
* No pagination yet

---

## What This Project Demonstrates

* Real‑world SaaS multi‑tenant architecture
* Secure role‑based authorization
* Clean API and frontend integration
* Practical debugging of production‑like issues
* End‑to‑end system design thinking

This project was built to understand how **real SaaS platforms are designed, secured, and debugged** — not just how CRUD applications are written.
