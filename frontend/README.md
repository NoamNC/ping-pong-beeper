# 📟 Real-Time Pager App

This is a modern, real-time pager application built with **React**, **TypeScript**, **Tailwind CSS**, and **Server-Sent Events (SSE)** for real-time communication. The application is containerized using **Docker** and supports dynamic ping-pong message display, highlighting, and latency tracking.

---

## 🧩 Features

- 📡 **Real-Time Streaming with Server-Sent Events (SSE)**
- 🧪 **Ping Button with Latency Measurement**
- 🟢 **Blinking Light for New Messages**
- 🕒 **Live Clock Display**
- 📃 **Message Navigation Controls**
- 🎨 Styled with Tailwind using `clsx-for-tailwind`
- 🐳 Dockerized for easy deployment

---

## 🗂️ Project Structure

```
src/
├── components/           # UI components like Pager, Buttons, Clock
├── context/              # React Context for state sharing (Messages, Display)
├── hooks/                # Custom hooks (e.g., SSE stream handling)
├── lib/                  # Utility functions and type definitions
├── services/             # API service layer (e.g., sendPing)
├── App.tsx               # Main app entry point
├── index.tsx             # React DOM rendering
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NoamNC/ping-pong-beeper.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```
REACT_APP_API_BASE_URL=http://localhost:8000
```

### 4. Run the App

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker

### Build & Run with Docker

```bash
docker build -t pager-app .
docker run -p 3000:3000 pager-app
```

---

## 📁 Scripts

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm start`     | Runs the app in development mode   |
| `npm run build` | Builds the app for production      |
| `npm test`      | Launches the test runner           |

---


## 🛠️ Technologies Used

- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Server-Sent Events (SSE)**
- **clsx-for-tailwind**
- **Docker**
- **Lucide React Icons**

---

## 📬 Environment Variables

| Variable                  | Purpose                          |
|---------------------------|----------------------------------|
| `REACT_APP_API_BASE_URL`  | Backend base URL for ping & SSE  |

---

## 👤 Author

Created by Noam Cohen
