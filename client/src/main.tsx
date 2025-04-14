import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Ensure .tsx extension
import './App.css'; // Keep global styles import

// Use non-null assertion as index.html guarantees #root exists
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
// Removed reportWebVitals import and call if it existed
