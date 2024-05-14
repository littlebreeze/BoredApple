'use client'
import React from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({progress}) => {
  return (
    <div className='flex gap-3'>
      <div className={`flex-1 rounded-3xl p-1 ${progress >= 1 ? 'bg-ourBlue' : 'bg-ourGray'}`}></div>
      <div className={`flex-1 rounded-3xl p-1 ${progress >= 2 ? 'bg-ourBlue' : 'bg-ourGray'}`}></div>
      <div className={`flex-1 rounded-3xl p-1 ${progress >= 3 ? 'bg-ourBlue' : 'bg-ourGray'}`}></div>
    </div>
  );
};

export default ProgressBar;
