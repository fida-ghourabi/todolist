import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Ajouter axios pour faire des requêtes HTTP

export default function TaskApp() {
  // États pour chaque champ du formulaire
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [tag, setTag] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('pending'); 
  const [successMessage, setSuccessMessage] = useState(''); // État pour afficher l'alerte
  const [errorMessage, setErrorMessage] = useState(''); // État pour gérer les erreurs

  const navigate = useNavigate();

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission
    const taskData = {
      description,
      priority,
      tag,
      status,
      deadline,
    };
    console.log('Task submitted:', taskData);

    // Envoi des données à l'API Symfony
    axios.post('http://localhost:8000/api/tasks', taskData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajouter le token d'authentification si nécessaire
      }
    })
      .then((response) => {
        setSuccessMessage('Task added successfully!');
        // Réinitialiser le formulaire
        setDescription('');
        setPriority('');
        setTag('');
        setDeadline('');
        setStatus('pending');

        // Rediriger vers le tableau de bord après un délai
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/dashboard/');
        }, 2000); // Délai de 2 secondes
      })
      .catch((error) => {
        setErrorMessage('Error: ' + (error.response ? error.response.data.error : error.message));
        console.error(error);
      });

   
  };

  // Fonction pour annuler l'édition de la tâche
  const handleCancel = () => {
    console.log('Task adding cancelled');
    navigate('/dashboard/');
  };

  // Obtenir la date actuelle au format YYYY-MM-DD pour empêcher la sélection de dates passées
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mt-4">
      {/* Section titre */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">New Task</h2>
        <p className="text-muted">
          Fill in the form to create a new task.
        </p>
      </div>

      {/* Affichage du message de succès */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Formulaire de tâche */}
      <form onSubmit={handleSubmit} className="p-3 border rounded bg-light shadow-sm">
        {/* Champ pour la description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Met à jour l'état 'description'
            className="form-control"
            rows={3}
            required // Champ requis
          />
        </div>

        {/* Champ pour la priorité */}
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)} // Met à jour l'état 'priority'
            className="form-select"
            required
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Champ pour le tag */}
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)} // Met à jour l'état 'tag'
            className="form-control"
            required // Champ requis
          />
        </div>

        {/* Champ pour la date */}
        <div className="mb-3">
          <label className="form-label">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)} // Met à jour l'état 'date'
            className="form-control"
            min={today} // Empêche la sélection de dates passées
            required // Champ requis
          />
        </div>

        {/* Boutons de soumission et d'annulation */}
        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            onClick={handleCancel} // Appelle la fonction 'handleCancel' pour annuler
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
