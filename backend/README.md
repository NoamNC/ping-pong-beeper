# 🚀 Backend - Ping Pong Service

This is the backend service for the Ping Pong application, built with **NestJS**, **Server-Sent Events (SSE)**, and **Redis Streams**.

---

## 🧩 Features

- 🌐 REST API to accept ping messages
- 📡 SSE endpoint for real-time "pong" streaming
- 🧠 Redis Streams-based message queuing and processing
- 🔁 Background processor to relay "ping" as "pong"
- 🐳 Dockerized for easy deployment

---

## 🗂️ Project Structure

```
src/
├── ping/                   # Ping feature module
│   ├── dto/                # Data Transfer Objects (optional)
│   ├── ping.controller.ts  # REST API + SSE controller
│   ├── ping.processor.ts   # Redis stream processor
│   └── ping.service.ts     # Business logic and stream source
├── redis/
│   └── redis.service.ts    # Redis stream utilities
├── app.module.ts           # Root application module
├── main.ts                 # Application bootstrap
```

---

## 🔧 Setup

### 1. Clone the repository

```bash
git clone https://github.com/NoamNC/ping-pong-beeper.git
cd ping-pong-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root directory:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=8000
```

### 4. Run the app

#### Development
```bash
npm run start:dev
```

#### Production
```bash
npm run build
npm run start:prod
```

---

## 🐳 Docker

### Build and Run

```bash
docker build -t ping-pong-backend .
docker run -p 8000:8000 ping-pong-backend
```

---


## 📬 Endpoints

### `POST /api/ping`
Accepts a ping message and queues it into Redis.

**Example:**
```bash
curl -X POST http://localhost:8000/api/ping -H "Content-Type: application/json" -d '{"message": "ping"}'
```

---

### `GET /api/ping/stream`
Opens a live SSE stream. Clients will receive a `"pong"` whenever a `ping` is processed.

---

## 📦 Tech Stack

- **NestJS**
- **TypeScript**
- **Redis (Streams)**
- **Server-Sent Events (SSE)**
- **Docker**

---


## 👤 Author

Built by Noam Cohen
