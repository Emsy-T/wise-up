//PlayerStats.tsx

import React from 'react';

interface PlayerStatsProps {
  money: number; // Player's current money balance
  savings: number; // Player's current savings balance
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ money, savings }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 flex flex-col space-y-2'>
      {/* Display Money */}
      <div className='flex justify-between items-center'>
        <span className='font-semibold text-gray-700'>Money</span>
        <span className='text-orange-500 font-bold'>
          ₦ {money.toLocaleString()}
        </span>
      </div>

      {/* Display Savings */}
      <div className='flex justify-between items-center'>
        <span className='font-semibold text-gray-700'>Savings</span>
        <span className='text-green-600 font-bold'>
          ₦ {savings.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PlayerStats;
