import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Dashboard.css'; // Assurez-vous de lier votre fichier CSS
//import Rides from '../Rides/Rides';
//import RideCond from '../RideCond/RideCond';
//import RidePassg from '../RidePassg/RidePassg';
import AddTask from '../AddTask/AddTask';
//import UpdateRide from '../UpdateRide/UpdateRide';
import EditTask from '../EditTask/EditTask';
import CompletedTask from '../ListTasks/CompletedTask';
import AllTasks from '../ListTasks/AllTasks';
import PendTask from '../ListTasks/PendTask';
import StartTask from '../ListTasks/StartTask';
import PrivateRoute from '../PrivateRoute'; // Importez le composant de route privée


const Dashboard = () => {
  return (
   
      <div className="dashboard-container">
        <Sidebar />
        
        <div className="content-container">
        <Navbar />

          <main className="main-content">
            <Routes>
            <Route path="/" element={ <PrivateRoute>
                                      <AllTasks />
                                      </PrivateRoute>} />
            <Route path="/Comtasks" element={<PrivateRoute>
                                             <CompletedTask />
                                             </PrivateRoute>} />
            <Route path="/Startasks" element={<PrivateRoute>
                                              <StartTask />
                                              </PrivateRoute>} />
            <Route path="/Pendtasks" element={ <PrivateRoute>
                                               <PendTask />
                                               </PrivateRoute>} />
            <Route path="/Addtasks" element={<PrivateRoute>
                                             <AddTask />
                                             </PrivateRoute>} />
          <Route path="/EditTask/:id" element={<PrivateRoute>
                                               <EditTask />
                                               </PrivateRoute>} />


            </Routes>
          </main>

        </div>
      </div>
    
  );
};

export default Dashboard;
