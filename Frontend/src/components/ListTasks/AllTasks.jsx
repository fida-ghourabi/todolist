import React, { useState , useEffect } from 'react';
import CardTask from './CardTask';
import { FaTasks } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap'; // Import react-bootstrap components
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Importer axios pour les requêtes API

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();


  // Récupérer les tâches depuis l'API au chargement du composant
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajouter le token d'authentification
        },
      });
      setTasks(response.data.tasks); // Sauvegarder les tâches dans l'état
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  useEffect(() => {

    fetchTasks(); // Appeler la fonction pour récupérer les tâches
  }, []); // Le tableau vide signifie que cela se produit une seule fois au montage du composant



  const handleDelete = async (id) => {
    try {
      // Envoyer la requête DELETE à l'API
      const response = await axios.delete(`http://localhost:8000/api/tasks/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Utiliser le token d'authentification
        },
      });
  
      // Si la suppression est réussie, mettre à jour l'état des tâches
      console.log('Task deleted:', response.data.message);
      // Recharger les tâches
       fetchTasks();   
      // Fermer la modale de confirmation
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowConfirmModal(true); // Afficher la popup
  };

  const handleEdit = (id) => {
    console.log('Edit task:', id);
    navigate(`/dashboard/EditTask/${id}`);
  };

  const handleStart = async (id) => {
    try {
      const updatedTask = tasks.find(task => task.id === id);
      const modifiedTask = {
        description: updatedTask.description,  // Utilise la description existante
        status: updatedTask.status === 'started' ? 'pending' : 'started',
        priority: updatedTask.priority,        // Utilise la priorité existante
        tag: updatedTask.tag,                  // Utilise le tag existant
        deadline: updatedTask.deadline,        // Utilise la deadline existante
      };
      console.log("Tâche modifiée :", modifiedTask);
  
      // Envoi de la requête PUT pour mettre à jour la tâche
      const response = await axios.put(`http://localhost:8000/api/tasks/modify/${id}`, modifiedTask, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token pour l'authentification
        },
      });
  
      // Mettre à jour l'état avec la tâche modifiée
      //setTasks(tasks.map(task => (task.id === id ? response.data : task)));
      // Recharger les tâches
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const updatedTask = tasks.find(task => task.id === id);
      const modifiedTask = {
        description: updatedTask.description,  // Utilise la description existante
        status: updatedTask.status === 'completed' ? 'pending' : 'completed',
        priority: updatedTask.priority,        // Utilise la priorité existante
        tag: updatedTask.tag,                  // Utilise le tag existant
        deadline: updatedTask.deadline,        // Utilise la deadline existante
      };
      console.log("Tâche modifiée :", modifiedTask);
  
      // Envoi de la requête PUT pour mettre à jour la tâche
      const response = await axios.put(`http://localhost:8000/api/tasks/modify/${id}`, modifiedTask, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token pour l'authentification
        },
      });
  
      // Mettre à jour l'état avec la tâche modifiée
      //setTasks(tasks.map(task => (task.id === id ? response.data : task)));
      // Recharger les tâches
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  return (
    <div>
      <h2 className="h2">All Tasks</h2>
      {tasks.length === 0 ? (
        <div className="text-center py-5">
          <FaTasks size={80} className="text-muted mb-3" />
          <p className="text-muted">No tasks available</p>
        </div>
      ) : (
        <div className="row row-cols-1 g-4">
          {tasks.map((task) => (
            <div key={task.id} className="col">
              <CardTask
                task={task}
                onDelete={() => confirmDelete(task.id)} // Utiliser confirmDelete ici
                onEdit={handleEdit}
                onStart={handleStart}
                onComplete={handleComplete}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modale de confirmation */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(taskToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllTasks;
