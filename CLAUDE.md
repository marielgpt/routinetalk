# RoutineTalk - CLAUDE.md

## What this project is
RoutineTalk is a skincare and makeup platform where creators share
step-by-step routines and followers can send products directly to
Instacart in one tap via MCP integration.

Target users:
- General users: discover and follow routines
- Creators: build and share shoppable routines
- Private users: personal routine tracking

The agentic feature: paste a YouTube or Reddit link and Claude
automatically builds a shoppable routine with creator attribution.

## Tech stack
- Language: TypeScript + Node.js
- Frontend: Next.js (React framework) + Tailwind CSS + shadcn/ui
- Backend framework: Express
- Database: PostgreSQL
- Message queue: RabbitMQ (AWS Amazon MQ)
- Containers: Docker + Docker Compose
- Hosting: AWS ECS
- CI/CD: GitHub Actions
- MCP integration: Instacart MCP
- Repo: github.com/marielgpt/routinetalk

## Service architecture
This is a monorepo with five microservices in /services:

- user-service: registration, login, JWT auth, profile management
- routine-service: create/read/update/delete routines, product steps
- cart-service: Instacart MCP integration, cart building, checkout
- notification-service: email and push notifications via RabbitMQ
- billing-service: subscription management, Stripe integration
- api-gateway: single entry point, routes requests to services

Services communicate via RabbitMQ for async events and REST for
synchronous calls. Each service has its own PostgreSQL database.

## Code conventions
- All services follow the same folder structure:
  src/routes, src/controllers, src/services, src/models
- File naming: camelCase for files, PascalCase for classes
- Error handling: always use try/catch, return structured errors
- Auth: JWT tokens, HS256, 7-day expiry, stored in httpOnly cookies
- Environment variables: always via .env, never hardcoded
- Every route has a health check endpoint at /health

## What NOT to do
- Do not use any frontend frameworks (React, Vue etc) — backend only
- Do not use Python — TypeScript only
- Do not introduce new npm packages without checking package.json first
- Do not hardcode any API keys, secrets, or credentials
- Do not use TikTok links for the agentic feature — YouTube and Reddit only
- Do not create separate databases for testing — use test schemas

## Current status
COMPLETED:
- GitHub repo set up: github.com/marielgpt/routinetalk
- Hello World landing page live at routinetalk.com (GitHub Pages)
- Service folder structure created with .gitkeep placeholders
- .gitignore in place

IN PROGRESS:
- Writing CLAUDE.md (this file!)

UP NEXT:
- Scaffold frontend with Next.js + Tailwind + shadcn/ui
- Docker setup and docker-compose.yml
- Scaffold user-service with Express + PostgreSQL
- JWT auth implementation

## Building in public
This project is documented on Substack at mariel.substack.com
Series: From Idea to AI Agent: for PMs
Every architectural decision is explained in the posts.

## Working preferences
- Commit after each meaningful unit of work automatically — no need to ask
- Use descriptive commit messages: type: description
- Example: feat: add user service health endpoint
- Work autonomously — no need to pause for confirmation on file creation or commands
- Do not push to GitHub — that stays a manual step