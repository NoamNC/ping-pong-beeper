# 🌐 Ping Pong - Fullstack App

A real-time ping-pong messaging app built with **React (frontend)**, **NestJS (backend)**, **Redis Streams**, and **WebSockets**, all orchestrated using **Docker Compose**.

---

## 🧩 Features


### Frontend
- ⚛️ React 19 + TypeScript
- 🧪 Send "ping" requests
- 📡 Live "pong" stream via SSE
- 🕒 Real-time clock, latency tracking, and blinking UI

### Backend
- 🚀 NestJS + TypeScript
- 📬 REST endpoint for sending pings
- 🔁 Redis stream processor
- 📡 Real-time "pong" stream using Server-Sent Events

---

## 📁 Project Structure

```
project-root/
├── backend/            # NestJS app
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── frontend/           # React app
│   ├── src/
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml  # Multi-container setup
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NoamNC/ping-pong-beeper.git
cd ping-pong
```

### 2. Start all services

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000/api/ping](http://localhost:8000/api/ping)
- WebSocket: `ws://localhost:6789`

---

## 🧪 Test the API

Send a ping using curl:

```bash
curl -X POST http://localhost:8000/api/ping -H "Content-Type: application/json" -d '{"message": "ping"}'
```

Watch the frontend respond with a blinking light and pong details!

---

## ⚙️ Environment Variables

### Frontend

| Variable              | Purpose                     | Value                   |
|-----------------------|-----------------------------|-------------------------|
| `REACT_APP_API_URL`   | Backend REST API base URL   | http://localhost:8000   |

### Backend

| Variable      | Purpose                 | Value          |
|---------------|-------------------------|----------------|
| `REDIS_HOST`  | Redis container hostname| localhost      |
| `REDIS_PORT`  | Redis port              | 6379           |
| `PORT`        | Backend HTTP port       | 8000           |

---

## 🧱 Built With

- **React 19**
- **Tailwind CSS**
- **NestJS 11**
- **Redis (Streams)**
- **WebSockets**
- **Docker + Docker Compose**

---

## 📦 Useful Commands

### Clean up all containers
```bash
docker-compose down --volumes --remove-orphans
```

### Rebuild everything
```bash
docker-compose up --build
```

---


## 👤 Author

Built by Noam Cohen
