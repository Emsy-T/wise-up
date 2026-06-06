//PlayerStats.tsx

import React from 'react';

interface PlayerStatsProps {
  money: number; // Player's current money balance
  savings: number; // Player's current savings balance
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ money, savings }) => {
  return (
    <div className='bg-white backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl px-3 sm:px-5 py-2 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 shadow-xl whitespace-nowrap'>
      {/* Display Money */}
      <div className='flex flex-col'>
        <span className='text-xs sm:text-s text-gray-400'>Money</span>
        <span className='text-sm sm:text-lg font-bold text-black'>
          ₦ {money.toLocaleString()}
        </span>
      </div>

      <div className='hidden sm:block w-px h-10 bg-white/10' />

      {/* Display Savings */}
      <div className='flex flex-col'>
        <span className='text-xs sm:text-s text-gray-400'>Savings</span>
        <span className='text-sm sm:text-lg font-bold text-black'>
          ₦ {savings.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PlayerStats;
