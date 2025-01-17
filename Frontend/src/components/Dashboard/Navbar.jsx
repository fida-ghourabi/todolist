import React, { useState, useEffect } from 'react';
import { User, ChevronDown } from 'lucide-react';
import './Navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', username: '' });
  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const storedName = localStorage.getItem('name');
    const storedUsername = localStorage.getItem('username');
    setUser({
      name: storedName ,
      username: storedUsername ,
    });
  }, []);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
     // Supprimer les données de l'utilisateur du localStorage lors de la déconnexion
     localStorage.removeItem('name');
     localStorage.removeItem('username');
     localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <div className="navbar-container">
      <h2 className="navbar-title">Dashboard</h2>

      <div className="navbar-right">
        <div
          className={`user-info ${isDropdownOpen ? 'open' : ''}`}
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <div className="user-details">
            <p className="user-name">
            {user.name} <ChevronDown className="arrow-icon" />
            </p>
            <p className="user-email">{user.username}</p>
          </div>
          <div className="user-avatar">
            <User className="user-icon" />
          </div>

          {/* Dropdown Menu */}
          <div
            className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}
            role="menu"
          >
           
           
            <div className="dropdown-item" role="menuitem" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
