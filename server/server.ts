import express, { Request, Response } from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const PORT: number = 8080;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Define the structure of our analytics data
interface AnalyticsData {
    timestamp: string;
    active_users: number;
    page_views: number;
    avg_session_duration: number;
}

let activeUsers: number = 100;
let avgSessionDuration: number = 5.0;
// No need to store history server-side if client manages it
// let pageViewsHistory: { timestamp: string; views: number }[] = [];

// Function to generate mock data
function generateMockData(): AnalyticsData {
    // Simulate fluctuations
    activeUsers += Math.floor(Math.random() * 21) - 10; // Fluctuate between -10 and +10
    if (activeUsers < 30) activeUsers = 30; // Minimum users
    if (activeUsers > 200) activeUsers = 200; // Maximum users

    // Page views roughly related to active users
    const newPageViews: number = Math.max(50, activeUsers * (1 + Math.random()));

    // Simulate avg session duration changes
    avgSessionDuration += (Math.random() * 1.0) - 0.5; // Fluctuate between -0.5 and +0.5
    if (avgSessionDuration < 1.5) avgSessionDuration = 1.5; // Min duration
    if (avgSessionDuration > 10.0) avgSessionDuration = 10.0; // Max duration

    const timestamp = new Date().toISOString();

    return {
        timestamp: timestamp,
        active_users: activeUsers,
        page_views: Math.floor(newPageViews),
        avg_session_duration: parseFloat(avgSessionDuration.toFixed(1)),
    };
}

// WebSocket connection handling
wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    // Send current state on connect
    ws.send(JSON.stringify(generateMockData()));

    ws.on('message', (message: Buffer) => { // Message is received as Buffer
        console.log('Received:', message.toString());
        // Handle messages from client if needed
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error: Error) => {
        console.error('WebSocket error:', error);
    });
});

// Broadcast data periodically
setInterval(() => {
    const data: AnalyticsData = generateMockData();
    const jsonData: string = JSON.stringify(data);
    // console.log("Broadcasting data:", jsonData); // Log data being sent

    wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(jsonData);
        }
    });
}, 2000); // Send updates every 2 seconds

// Basic HTTP endpoint (optional)
app.get('/', (req: Request, res: Response) => {
    res.send('Real-Time Analytics Server is running (TypeScript).');
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
