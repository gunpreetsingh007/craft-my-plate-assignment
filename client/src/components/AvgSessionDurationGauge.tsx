import React from 'react';

interface AvgSessionDurationGaugeProps {
    duration: number | null;
}

const AvgSessionDurationGauge: React.FC<AvgSessionDurationGaugeProps> = ({ duration }) => {
  return (
    <div className="card gauge-container">
      <h2>⏱️ Avg. Session Duration</h2>
      <div className="metric-value">{duration ?? '...'} min</div>
      <p>Average time spent per session.</p>
      {/* Basic visual representation (optional) */}
      {/* <progress value={duration ?? 0} max="10" style={{ width: '80%', marginTop: '10px' }}></progress> */}
    </div>
  );
};

export default AvgSessionDurationGauge;
