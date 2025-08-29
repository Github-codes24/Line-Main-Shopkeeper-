// src/components/TopWorker.jsx
import React from "react";

const workers = [
  { name: "Theresa Webb", expertise: "Plumber", phone: "+91-9876543210", completed: 90, rating: 4 },
  { name: "Jane Cooper", expertise: "AC Repair", phone: "+91-9876543210", completed: 30, rating: 3 },
  { name: "Jacob Jones", expertise: "Electrician", phone: "+91-9876543210", completed: 50, rating: 5 },
  { name: "Brooklyn Simmons", expertise: "Painter", phone: "+91-9876543210", completed: 84, rating: 4 },
];

const TopWorker = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="font-semibold text-lg mb-2">Top Worker</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Expertise</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Orders Completed</th>
            <th className="p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((w, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{w.name}</td>
              <td className="p-2">{w.expertise}</td>
              <td className="p-2">{w.phone}</td>
              <td className="p-2">+{w.completed}</td>
              <td className="p-2">
                {"⭐".repeat(w.rating)}{"☆".repeat(5 - w.rating)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopWorker;
