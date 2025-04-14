# Real-Time Analytics Dashboard (TypeScript + Vite)

This project implements a full-stack real-time analytics dashboard using **TypeScript** to monitor mock website traffic metrics (Active Users, Page Views, Average Session Duration). The frontend is built with **React** and **Vite**.

## Features

*   Real-time updates via WebSockets.
*   Frontend built with React, TypeScript, and Vite.
*   Backend mock data generation using Node.js, Express, and TypeScript.
*   Displays Active Users, Average Session Duration, and a chart for Page Views over time.
*   Responsive UI design.

## Technologies Used

*   **Frontend:**
    *   React
    *   TypeScript
    *   Vite (Build tool and dev server)
    *   Recharts (for charts)
    *   CSS3
*   **Backend:**
    *   Node.js
    *   Express
    *   ws (WebSocket library)
    *   TypeScript
*   **Development:**
    *   npm
    *   `tsc` (TypeScript Compiler for backend)

## Setup and Running Locally

### Prerequisites

*   Node.js (v16 or later recommended for Vite)
*   npm (usually comes with Node.js)

### Steps

1.  **Clone the repository (or extract the ZIP):**
    ```bash
    git clone <your-repo-url>
    cd <repository-folder>
    # or extract the ZIP file
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Build the Backend Server:**
    Open a terminal in the `server` directory:
    ```bash
    npm run build
    ```
    This compiles the TypeScript code into the `dist` directory.

5.  **Start the Backend Server:**
    In the same terminal (`server` directory):
    ```bash
    npm start
    ```
    The server will start, typically on `http://localhost:8080`. (Alternatively, use `npm run dev` for development with auto-recompilation if configured).

6.  **Start the Frontend Development Server:**
    Open another terminal in the `client` directory:
    ```bash
    npm run dev
    ```
    This will start the Vite development server, usually opening the application automatically in your default browser at `http://localhost:3000` (or the next available port).

7.  **View the Dashboard:**
    Navigate to the URL provided by the Vite dev server (e.g., `http://localhost:3000`) in your web browser. You should see the dashboard updating in real-time.

8.  **(Optional) Build Frontend for Production:**
    To create a production build of the frontend:
    ```bash
    cd client
    npm run build
    ```
    The output will be placed in the `client/build` directory (or `client/dist` if not customized in `vite.config.ts`).

## Project Structure

```
.
├── client/         # React Frontend Application (TypeScript + Vite)
│   ├── src/
│   │   ├── components/ # React components (.tsx)
│   │   ├── App.css
│   │   ├── App.tsx     # Main application component
│   │   ├── main.tsx    # Entry point for Vite
│   │   ├── index.css   # Global styles
│   │   └── types.ts    # Shared frontend types
│   ├── index.html      # Vite entry HTML
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json # TS config for Vite config
│   └── vite.config.ts  # Vite configuration
├── server/         # Node.js Backend Server (TypeScript)
│   ├── dist/       # Compiled JavaScript output
│   ├── server.ts   # Express and WebSocket logic
│   ├── package.json
│   └── tsconfig.json
├── ARCHITECTURE.md # System architecture details
├── ARCHITECTURE.png # Architecture diagram
└── README.md       # This file
```

## Potential Improvements

*   More Sophisticated Mock Data, Enhanced UI/UX, Auth, Persistence, Tests, Deployment, State Management, Shared Types)
