## 📝 Implementation Summary

### 🧠 Design Philosophy

The goal was to build a robust, Dockerized real-time system using Redis Streams and WebSockets. The system is modular, maintainable, and easy to run locally using Docker Compose.

---

### 📦 Backend (NestJS)

- **Framework**: NestJS (modular, TypeScript-first)
- **Ping Endpoint**: `POST /api/ping` stores messages in Redis stream (`pings`)
- **Redis Stream**:
  - Uses `XADD` to queue ping messages
  - Background service (`PingProcessorService`) uses `XREAD` to poll the stream
- **WebSocket**:
  - Implemented with native `ws` for lightweight control
  - Broadcasts `"pong"` messages to all connected clients
- **Error Handling**:
  - Input validation for API
  - Safe reconnect logic with Redis
  - Graceful fallback on WebSocket broadcast failures

---

### 🎨 Frontend (React)

- **Framework**: React 19 with TypeScript
- **Ping Button**: Sends REST request to backend
- **WebSocket Listener**: Connects to backend WebSocket on load
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
  - Frontend uses `REACT_APP_API_URL`, `REACT_APP_WS_URL`
  - Backend uses `REDIS_HOST`, `REDIS_PORT`, `WS_PORT`

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
1. REST input → 2. Redis stream → 3. Background processor → 4. WebSocket → 5. React UI

The architecture is clean, extensible, and developer-friendly.

