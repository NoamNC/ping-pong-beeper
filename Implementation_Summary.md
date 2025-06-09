## 📝 Implementation Summary

### 🧠 Design Philosophy

The goal was to build a robust, Dockerized real-time system using Redis Streams and **Server-Sent Events (SSE)**. The system is modular, maintainable, and easy to run locally using Docker Compose.

---

### 📦 Backend (NestJS)

- **Framework**: NestJS (modular, TypeScript-first)
- **Ping Endpoint**: `POST /api/ping` stores messages in Redis stream (`pings`)
- **Redis Stream**:
  - Uses `XADD` to queue ping messages
  - Background service (`PingProcessorService`) uses `XREAD` to poll the stream
- **SSE Endpoint**:
  - Exposed via `GET /api/ping/stream`
  - Streams `"pong"` messages to all connected clients in real-time using `EventSource`
- **Error Handling**:
  - Input validation for API
  - Safe reconnect logic with Redis
  - Graceful handling of Redis stream read failures

---

### 🎨 Frontend (React)

- **Framework**: React 19 with TypeScript
- **Ping Button**: Sends REST request to backend
- **SSE Listener**: Connects to backend stream via `EventSource`
- **UI Features**:
  - Blinking light when message received
  - Real-time latency calculation
  - Message toggle (content vs. timestamps)
- **State Management**: Custom context providers (`MessagesProvider`, `DisplayProvider`)

---

### 🐳 Docker & Environment

- **Docker Compose** orchestrates:
  - NestJS backend
  - React frontend
  - Redis database
- **Environment Variables**:
  - Frontend uses `REACT_APP_API_BASE_URL`
  - Backend uses `REDIS_HOST`, `REDIS_PORT`, `PORT`

---

### ✅ Why Redis Streams?

Redis Streams were chosen over Pub/Sub for:
- **Persistence** (message durability)
- **Backpressure control** (e.g., slow consumers)
- **Built-in IDs for tracking** (like Kafka)

---

### 🧪 Testing

While basic manual testing is possible via UI and `curl`, the system is test-ready via:
- `jest` (backend)
- `@testing-library/react` (frontend)

---

### 📋 Conclusion

This project successfully demonstrates a full real-time pipeline:
1. REST input → 2. Redis stream → 3. Background processor → 4. SSE stream → 5. React UI

The architecture is clean, extensible, and developer-friendly.
