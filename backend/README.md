# 🚀 Backend - Ping Pong Service

This is the backend service for the Ping Pong application, built with **NestJS**, **WebSockets**, and **Redis Streams**.

---

## 🧩 Features

- 🌐 REST API to accept ping messages
- 📡 WebSocket server for real-time message broadcasting
- 🧠 Redis Streams-based message processing and queuing
- 🔁 Background processor to relay ping messages as "pong"
- 🐳 Dockerized for easy deployment

---

## 🗂️ Project Structure

```
src/
├── ping/                   # Ping feature module
│   ├── dto/                # Data Transfer Objects
│   ├── ping.controller.ts  # REST API controller
│   ├── ping.gateway.ts     # WebSocket server
│   ├── ping.processor.ts   # Redis stream processor
│   └── ping.service.ts     # Business logic
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
WS_PORT=6789
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
docker run -p 8000:8000 -p 6789:6789 ping-pong-backend
```

---

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

Run in watch mode:

```bash
npm run test:watch
```

Run with coverage:

```bash
npm run test:cov
```

---

## 📬 Endpoints

- `POST /api/ping` – Accepts ping message and queues it in Redis

### Example:
```bash
curl -X POST http://localhost:8000/api/ping -H "Content-Type: application/json" -d '{"message": "ping"}'
```

---

## 📦 Tech Stack

- **NestJS**
- **TypeScript**
- **Redis (Streams)**
- **WebSocket (ws)**
- **Docker**

---

## 🧾 License

MIT

---

## 👤 Author

Built by Noam Cohen
