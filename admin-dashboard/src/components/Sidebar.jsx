import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 p-4 bg-gray-100 dark:bg-slate-800 min-h-screen">
      <ul className="space-y-4">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/students">Manage Students</Link></li>
        <li><Link to="/teachers" className="block px-4 py-2 hover:bg-gray-700">Manage Teachers</Link></li>
        <li><Link to="/grades">Manage Grades</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
