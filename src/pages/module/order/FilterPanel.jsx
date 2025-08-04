import React, { useState } from 'react';

const FilterPanel = () => {
  const [expertise, setExpertise] = useState({
    Electrician: true,
    Painter: false,
    Carpenter: false,
    'AC Repair': false,
    'Tile Fitting': false,
    Plumber: true,
  });

  const [status, setStatus] = useState({
    All: true,
    'Work in Progress': false,
    Pending: false,
    Completed: false,
    Rejected: false,
  });

  const toggleExpertise = (key) => setExpertise({ ...expertise, [key]: !expertise[key] });
  const toggleStatus = (key) => setStatus({ ...status, [key]: !status[key] });

  return (
    <div className="bg-white rounded-lg shadow-md px-3 py-2 w-64 text-sm border border-gray-300">
      <p className="text-base font-semibold mb-2">Expertise</p>
      {Object.entries(expertise).map(([key, value]) => (
        <label key={key} className="flex items-center space-x-2 mb-2">
          <input type="checkbox" checked={value} onChange={() => toggleExpertise(key)} className="accent-white"/>
          <span className='text-sm'>{key}</span>
        </label>
      ))}

      <p className="text-base font-semibold mt-2 mb-2">Status</p>
      {Object.entries(status).map(([key, value]) => (
        <label key={key} className="flex items-center space-x-2 mb-2">
          <input type="checkbox" checked={value} onChange={() => toggleStatus(key)} className="accent-white" />
          <span className='text-sm'>{key}</span>
        </label>
      ))}
    </div>
  );
};

export default FilterPanel;
