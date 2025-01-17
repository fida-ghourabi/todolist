import React, { useState, useEffect } from 'react';
import { useNavigate , useParams} from "react-router-dom";
import axios from 'axios';

export default function EditTask() {
  const { id } = useParams(); // Get task ID from the URL
  const [task, setTask] = useState(null); // Store task data

  // États pour chaque champ du formulaire
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [tag, setTag] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // État pour afficher l'alerte
  const navigate = useNavigate();


  // Fetch task data when component mounts
  useEffect(() => {
    const fetchTask = async () => {
      console.log('id:',id)
      try {
        const response = await axios.get(`http://localhost:8000/api/tasks/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const taskData = response.data.task;
        setTask(taskData);
        console.log(taskData)
        setDescription(taskData.description);
        setPriority(taskData.priority);
        setTag(taskData.tag);
  // Extraire uniquement la date (YYYY-MM-DD)
        const formattedDeadline = taskData.deadline.split(' ')[0];
        setDeadline(formattedDeadline);         setStatus(taskData.status);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);


  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission
    const updatedTask = {
      description,
      priority,
      tag,
      deadline,
      status,
    };

    try {
      await axios.put(`http://localhost:8000/api/tasks/modify/${id}`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccessMessage('Task updated successfully!');
      setTimeout(() => {setSuccessMessage('')
      navigate('/dashboard/');}, 2000);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Fonction pour annuler l'édition de la tâche
  const handleCancel = () => {
    console.log('Task editing cancelled');
    navigate('/dashboard/');
  };

  // Obtenir la date actuelle au format YYYY-MM-DD pour empêcher la sélection de dates passées
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mt-4">
      {/* Section titre */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary">Edit Task</h2>
        <p className="text-muted">
          Modify the details of the selected task.
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
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
