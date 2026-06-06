// LevelHeader.tsx

import React from 'react';

interface LevelHeaderProps {
  levelNumber: number;
  title: string;
}

const LevelHeader: React.FC<LevelHeaderProps> = ({ levelNumber, title }) => {
  return (
    <div className='bg-orange-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-md sm:rounded-lg shadow-md'>
      <h2 className='text-sm sm:text-lg font-bold whitespace-nowrap'>
        Level {levelNumber}: {title}
      </h2>
    </div>
  );
};

export default LevelHeader;
