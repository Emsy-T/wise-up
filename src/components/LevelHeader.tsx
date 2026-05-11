// LevelHeader.tsx

import React from 'react';

interface LevelHeaderProps {
  levelNumber: number;
  title: string;
}

const LevelHeader: React.FC<LevelHeaderProps> = ({ levelNumber, title }) => {
  return (
    <div className='bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md'>
      <h2 className='text-lg font-bold'>
        Level {levelNumber}: {title}
      </h2>
    </div>
  );
};

export default LevelHeader;
