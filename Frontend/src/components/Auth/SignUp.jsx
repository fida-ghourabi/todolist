import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' }); 
  const navigate = useNavigate();

   // Fonction de validation email
   const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction de validation du mot de passe
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

   
      // Vérification : au moins deux mots
      if (!/^.+\s.+$/.test(formData.username)) {
        newErrors.name = "Le nom complet doit contenir au moins deux mots.";
      }

      // Vérification : que des lettres et espaces
      else if (!/^[A-Za-z\s]+$/.test(formData.username)) {
        newErrors.name = "Le nom complet doit contenir uniquement des lettres et des espaces.";
      }
    
    

   // Validation d'email'
   if (!isEmailValid(formData.email)) {
    newErrors.email =
      "S'il vous plaît, mettez une adresse email valide.";
  }
    // Validation du mot de passe
    if (!isPasswordValid(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters, include uppercase, lowercase, numbers, and special characters.';
    }

    // Validation de la confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match!';
    }

    // Si des erreurs existent, les afficher
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      
      setErrors(newErrors);

      const response = await axios.post('http://localhost:8000/api/register', {
        username: formData.email,
        name: formData.username,
        password: formData.password,
      });

      setAlert({ message: 'Registration successful!', type: 'success' });
      setTimeout(() => {
        setAlert({ message: '', type: '' });
        navigate('/signin'); // Redirection vers la page de connexion
      }, 3000);

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        message: 'Failed to register, please try again.',
        type: 'error',
      });
      setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-vh-100 position-relative bg-light d-flex align-items-center justify-content-center py-5 px-3">
        <div className="card shadow-lg bg-white bg-opacity-90 backdrop-blur rounded-3 p-4" style={{ maxWidth: '28rem', zIndex: 1 }}>
          <div className="card-body">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Create Account</h2>
              <p className="text-muted">Join TaskMaster today and boost your productivity</p>
            </div>

            {/* Message d'alerte général */}
            {alert.message && (
              <div
                className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'} text-center`}
                role="alert"
              >
                {alert.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your full name"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                {/* Message d'erreur pour le mot de passe */}
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                {/* Message d'erreur pour le mot de passe */}
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    
                    required
                  />
                </div>
                {/* Message d'erreur pour le mot de passe */}
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                {/* Message d'erreur pour la confirmation du mot de passe */}
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Create Account
                </button>
              </div>
            </form>

            <p className="mt-3 text-center">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
