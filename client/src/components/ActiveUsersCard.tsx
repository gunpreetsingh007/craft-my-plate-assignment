import React from 'react';

interface ActiveUsersCardProps {
  count: number | null;
}

const ActiveUsersCard: React.FC<ActiveUsersCardProps> = ({ count }) => {
  return (
    <div className="card">
      <h2>👥 Active Users</h2>
      <div className="metric-value">{count ?? '...'}</div>
      <p>Users currently browsing the site.</p>
    </div>
  );
};

export default ActiveUsersCard;
