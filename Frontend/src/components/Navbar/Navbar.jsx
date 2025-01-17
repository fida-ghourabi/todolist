import React from 'react';
import { Link } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark py-1">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <FaTasks className="text-white" />
          <span className="text-white ms-2 fs-4 fw-bold">TaskMaster</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link text-white">Home</Link>
        <Link to="/signup" className="nav-link text-white">Sign Up</Link>
        <Link to="/signin" className="nav-link text-white">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
