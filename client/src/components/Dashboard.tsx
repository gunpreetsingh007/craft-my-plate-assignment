import React, { useState, useEffect, useRef } from 'react';
import ActiveUsersCard from './ActiveUsersCard';
import AvgSessionDurationGauge from './AvgSessionDurationGauge';
import PageViewsChart from './PageViewsChart';
import { AnalyticsData, PageViewDataPoint } from '../types'; // Import shared types

const MAX_HISTORY = 30; // Max data points for the chart
// Read WebSocket URL from environment variable
const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8080'; // Provide a fallback

const Dashboard: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [avgSessionDuration, setAvgSessionDuration] = useState<number | null>(null);
  const [pageViewsHistory, setPageViewsHistory] = useState<PageViewDataPoint[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    function connectWebSocket() {
      console.log(`Attempting to connect WebSocket to ${WEBSOCKET_URL}...`); // Log the URL being used
      ws.current = new WebSocket(WEBSOCKET_URL);

      ws.current.onopen = () => {
        console.log('WebSocket Connected');
      };

      ws.current.onclose = () => {
        console.log('WebSocket Disconnected');
        ws.current = null; // Clear the ref on close
        // Optional: Attempt to reconnect after a delay
        setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
      };

      ws.current.onerror = (event: Event) => {
        // The 'error' event object in the browser WebSocket API is just a generic Event
        console.error('WebSocket Error:', event);
        ws.current?.close(); // Close on error before reconnecting
      };

      ws.current.onmessage = (event: MessageEvent) => {
        try {
          // Assert the data type after parsing
          const data = JSON.parse(event.data) as AnalyticsData;
          // console.log('Data received:', data); // Log received data

          // Validate data structure (optional but recommended)
          if (typeof data.active_users !== 'number' ||
              typeof data.avg_session_duration !== 'number' ||
              typeof data.page_views !== 'number' ||
              typeof data.timestamp !== 'string') {
                console.error('Received invalid data structure:', data);
                return;
              }

          setActiveUsers(data.active_users);
          setAvgSessionDuration(data.avg_session_duration);

          // Update page views history
          setPageViewsHistory((prevHistory) => {
            const newHistory: PageViewDataPoint[] = [
              ...prevHistory,
              { timestamp: data.timestamp, views: data.page_views },
            ];
            // Keep only the last MAX_HISTORY points
            return newHistory.slice(-MAX_HISTORY);
          });

        } catch (error) {
          console.error('Failed to parse message or update state:', error);
        }
      };
    }

    connectWebSocket();

    // Cleanup function to close WebSocket connection when component unmounts
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        console.log('Closing WebSocket connection');
        ws.current.close();
      }
       ws.current = null; // Clear ref on unmount
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="dashboard">
      <ActiveUsersCard count={activeUsers} />
      <PageViewsChart data={pageViewsHistory} />
      <AvgSessionDurationGauge duration={avgSessionDuration} />
    </div>
  );
};

export default Dashboard;
