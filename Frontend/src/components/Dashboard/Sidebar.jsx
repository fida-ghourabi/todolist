import React from 'react';
import { Car, Search, Users, Calendar, MessageSquare, Settings, LogOut,MapPin,CalendarCheck,MapPinPlus,ClipboardList, Clock} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FaTasks } from 'react-icons/fa';
import { ListTodo, CheckCircle2, Play, Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: ListTodo, text: 'All Tasks', path: '/dashboard/' },
    { icon: CheckCircle2, text: 'Completed Tasks', path: '/dashboard/Comtasks' },
    { icon: Play, text: 'Started Tasks', path: '/dashboard/Startasks' },
    { icon: Clock, text: 'Pending Tasks', path: '/dashboard/Pendtasks' },
    { icon: Plus, text: 'Add Task', path: '/dashboard/Addtasks' },
  ];

  const navigate = useNavigate();


  
  const handleLogout = () => {
    // Supprimer les données de l'utilisateur du localStorage lors de la déconnexion
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
   navigate('/signin');
 };

  return (
    <div className="sidebar-container  bg-primary ">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="title-container">
          <FaTasks className="text-white icon " style={{ fontSize: '2rem' }} />
          <h1 className="sidebar-title">TaskMaster</h1>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span>{item.text}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
