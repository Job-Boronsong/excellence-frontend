import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Excellence & Development School Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Dashboard</h2>
          <Dashboard />
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Register</h2>
          <Register />
        </div>
      </div>
    </div>
  );
}

export default App;
