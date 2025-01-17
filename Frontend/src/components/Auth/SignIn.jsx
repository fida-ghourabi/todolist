import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios'; // Assurez-vous d'importer axios

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState({ message: '', type: '' }); // Gestion des alertes
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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
     // Si des erreurs existent, les afficher
     if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

   
    try {
     
      setErrors(newErrors);
      console.log('Sign in:', formData);
      const response = await axios.post(
        'http://localhost:8000/api/login_check', 
        {
          username: formData.email,  // Utilisez l'email comme username
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Assurez-vous que le content-type est bien défini
          },
        }
      );

      
// Vérifiez que la réponse contient un token
if (response.data.token) {
  // Sauvegarde du token et du nom d'utilisateur dans le localStorage
  localStorage.setItem('token', response.data.token);
    // Décoder le token JWT (partie payload)
    const token = response.data.token;
    const payload = JSON.parse(atob(token.split('.')[1])); // Décoder la partie payload du JWT
    
    // Extraire le nom d'utilisateur et le nom
    const username = payload.username; // Assurez-vous que 'username' est une clé dans le payload
    const name = payload.name;         // Assurez-vous que 'name' est une clé dans le payload
  
    // Sauvegarder le nom d'utilisateur et le nom dans le localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('name', name);
  console.log('Login success:', response.data);
  // Affichez une alerte de succès
  setAlert({ message: 'Login successful!', type: 'success' });
  setTimeout(() => {
    setAlert({ message: '', type: '' });
    navigate('/dashboard/'); // Redirection vers la page de connexion
  }, 3000);

  
} 
    } catch (error) {
      console.error('Login failed:', error);
       // Affichez une alerte d'erreur
       setAlert({
        message: 'Login failed. Please check your email and password.',
        type: 'danger',
      });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <div className="min-vh-100 position-relative bg-light d-flex align-items-center justify-content-center py-5 px-3">
        

        {/* Sign-in Card */}
        <div
          className="card shadow-lg bg-white bg-opacity-90 backdrop-blur rounded-3 p-5"
          style={{ maxWidth: '35rem', zIndex: 1 }}
        >
          <div className="card-body">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Welcome Back!</h2>
              <p className="text-muted">Sign in to continue to TaskMaster</p>
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
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaEnvelope />
                  </span>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                {/* Message d'erreur pour le mot de passe */}
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="form-check-input"
                  />
                  <label htmlFor="remember-me" className="form-check-label">
                    Remember me
                  </label>
                </div>
               
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Sign in
              </button>
            </form>

            <p className="mt-3 text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
