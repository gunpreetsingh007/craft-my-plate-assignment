import Dashboard from './components/Dashboard';
import './App.css';

function App() { // Can explicitly type as React.FC if preferred: const App: React.FC = () => { ... }
  return (
    <div className="App">
      <h1>Real-Time Website Analytics</h1>
      <Dashboard />
    </div>
  );
}

export default App;
