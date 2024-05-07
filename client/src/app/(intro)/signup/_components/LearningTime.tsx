'use client';
import { useState } from 'react';

export default function LearningTime() {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = () => {
    setSelected(selected);
  };

  return (
    <>
      <button
        className={`absolute bottom-2 mb-4 w-96 h-12 rounded-lg text-lg  ${
          selected ? 'bg-gray-300 cursor-not-allowed' : 'bg-ourBlue duration-[0.2s] hover:bg-ourTheme/80'
        } text-white`}
        onClick={handleClick}
        disabled={selected}
      >
        다음
      </button>
    </>
  );
}
