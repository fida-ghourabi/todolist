import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Vérifie si le token existe

  if (!token) {
    // Si aucun token, redirige vers la page de connexion
    return <Navigate to="/signin" />;
  }

  // Sinon, rendre le contenu protégé
  return children;
};

export default PrivateRoute;
