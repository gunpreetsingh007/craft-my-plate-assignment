import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PageViewDataPoint } from '../types'; // Import the shared type

interface PageViewsChartProps {
  data: PageViewDataPoint[];
}

const PageViewsChart: React.FC<PageViewsChartProps> = ({ data }) => {
  // Format timestamp for display on X-axis
  const formatXAxis = (tickItem: string): string => {
    try {
        const date = new Date(tickItem);
        // Ensure localeTimeString options are valid
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    } catch (e) {
        console.error("Error formatting date:", e);
        return tickItem; // Fallback
    }
  };

  return (
    <div className="card">
      <h2>📈 Page Views Over Time</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 25, // Increased bottom margin for angled labels
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* Added interval={0} to show more labels if needed, adjust as necessary */}
            <XAxis dataKey="timestamp" tickFormatter={formatXAxis} angle={-30} textAnchor="end" height={50} interval="preserveStartEnd" />
            <YAxis allowDecimals={false} domain={['auto', 'auto']} />
            <Tooltip labelFormatter={(label: string) => new Date(label).toLocaleString()} />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} name="Page Views" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PageViewsChart;
