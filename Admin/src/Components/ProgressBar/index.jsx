import React from 'react';

const ProgressBar = ({ value, type }) => {

    const colorMap = {
    success: 'bg-green-600',
    warning: 'bg-yellow-500',
    error: 'bg-red-600',
  };

   const colorClass = colorMap[type];

  return (
    <div className="w-[90px] h-[8px] rounded-md bg-gray-200 overflow-hidden">
      <span className={`block h-full transition-all duration-300 ease-in-out ${colorClass}`}style={{ width: `${value}%` }}></span>
    </div>
  );
};

export default ProgressBar;

