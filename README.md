# Saturei

Monorepo for the Saturei e-commerce platform.

## Projects

- `saturei-frontend` — Next.js 16 + TypeScript + Tailwind CSS
- `saturei-backend` — Spring Boot 3.5 + Java 17 + PostgreSQL

## to-do

### saturei-backend
#### architecture
* [ ] ddd package structure scaffold (user, listing, order, chat, review, shared) — lucas
* [ ] global exception handler — arthur
* [ ] request/response logging filter — joao

#### database
* [ ] postgresql datasource and jpa configuration — santana
* [ ] flyway migrations setup — santana
* [ ] initial schema migration (users, listings, orders, messages, reviews) — santana
* [ ] seed data for local development — arthur

#### security
* [ ] jwt authentication (filter, provider, token generation) — joao
* [ ] spring security configuration (cors, csrf, protected routes) — joao
* [ ] password encryption (bcrypt) — arthur
* [ ] refresh token support — joao

#### bounded contexts
* [ ] user bounded context (entity, repository, service) — arthur
* [ ] listing bounded context (crud, status management) — lucas
* [ ] image upload handling (storage + size optimization) — lucas
* [ ] search endpoint (keyword + filters: price, location, category) — lucas
* [ ] order bounded context (cart, checkout, payment gateway hook) — lucas
* [ ] chat bounded context (websocket with stomp) — joao
* [ ] review bounded context (post-transaction rating) — arthur

#### infra & devops
* [ ] dockerfile — santana
* [ ] docker-compose (app + postgres) — santana
* [ ] .env.example with required environment variables — santana
* [ ] github actions — ci (build + test on pull request) — lucas
* [ ] github actions — cd (deploy on push to main) — joao
* [ ] health check endpoint via actuator — arthur

### saturei-frontend
#### pages & features
* [ ] authentication pages (login, register) — richard
* [ ] social login (google/github via next-auth) — richard
* [ ] listing creation form (title, description, photos, condition, price) — pedro
* [ ] listing management page (edit, pause, delete) — pedro
* [ ] search page with filters (keyword, price range, location, category) — vini hen
* [ ] listing detail page — vini bel
* [ ] cart and checkout flow (payment method, shipping) — vini bel
* [ ] real-time chat ui (buyer ↔ seller) — vini hen
* [ ] user profile and reputation (ratings display) — vini bel
* [ ] responsive layout (mobile + desktop) — pedro

#### infra & devops
* [ ] dockerfile — richard
* [ ] .env.example with required environment variables — vini hen
* [ ] github actions — ci (lint + build on pull request) — richard
* [ ] github actions — cd (deploy on push to main) — pedro
