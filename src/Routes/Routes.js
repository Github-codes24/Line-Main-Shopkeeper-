import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WorkerList from '../Components/Module/Worker_Management/WorkerList';
import ViewWorker from '../Components/Module/Worker_Management/ViewWorker';
import EditWorker from '../Components/Module/Worker_Management/EditWorker';
import AddWorker from '../Components/Module/Worker_Management/AddWorker';

function AppRoutes({ workers, setWorkers }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<WorkerList workers={workers} setWorkers={setWorkers} />}
      />
      <Route path="/view/:id" element={<ViewWorker />} />
      <Route
        path="/edit-worker/:id"
        element={<EditWorker workers={workers} setWorkers={setWorkers} />}
      />
      <Route
        path="/add-worker"
        element={<AddWorker workers={workers} setWorkers={setWorkers} />}
      />
    </Routes>
  );
}

export default AppRoutes;
