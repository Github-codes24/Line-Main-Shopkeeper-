import React from 'react';

const Card = ({ title, amount, change, icon, bgColor, textColor }) => {
  return (
    <div className={`rounded-lg p-4 shadow-md ${bgColor} text-${textColor} w-full`}>
      {/* Top Icon */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-md font-semibold">{title}</h3>
        <div className="text-xl">{icon}</div>
      </div>

      {/* Amount */}
      <div className="text-2xl font-bold mb-1">₹ {amount}</div>

      {/* Change */}
      <div className="text-sm flex items-center">
        {/* Arrow Icon */}
        {change.includes('-') ? (
          <svg
            className="w-4 h-4 mr-1 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 mr-1 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        )}
        {change} This Month
      </div>
    </div>
  );
};

export default Card;
