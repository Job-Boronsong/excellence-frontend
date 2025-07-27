import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Navbar />
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;
