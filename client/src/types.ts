// Type for the data received from the WebSocket server
export interface AnalyticsData {
    timestamp: string;
    active_users: number;
    page_views: number;
    avg_session_duration: number;
}

// Type for the data points used in the Page Views chart
export interface PageViewDataPoint {
    timestamp: string;
    views: number;
}
