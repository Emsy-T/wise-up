import React, { useState } from 'react';
import type { PlayerState, Level } from '../types/gameTypes';

// Import subcomponents (to be created separately)
import PlayerStats from './PlayerStats';
import BudgetModal from './BudgetModal';
import LevelIntroModal from './LevelIntro';

interface GameMapProps {
  state: PlayerState; // Current player state (money, savings, level, etc.)
  levels: Level[]; // Array of levels with metadata
  onEnterLevel: (level: Level) => void; // Callback when player starts a level
}

const GameMap: React.FC<GameMapProps> = ({ state, levels, onEnterLevel }) => {
  // Track whether the budget modal is open
  const [showBudget, setShowBudget] = useState(false);

  // Track which level intro modal is open (null if none)
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  return (
    <div className='relative h-screen w-full bg-gray-100 flex flex-col'>
      {/* --- Top Left: Player Stats + Budget Button --- */}
      <div className='absolute top-4 left-4 flex items-center space-x-4'>
        {/* PlayerStats shows money and savings */}
        <PlayerStats money={state.money} savings={state.savings} />

        {/* Budget button beside stats */}
        <button
          onClick={() => setShowBudget(true)}
          className='p-2 bg-white rounded-full shadow hover:bg-gray-200 transition'
          aria-label='Open Budget'
        >
          {/* Simple icon (document style) */}
          <span className='material-icons text-orange-500'>receipt_long</span>
        </button>
      </div>

      {/* --- Main Section: Horizontal Level Pathway --- */}
      <div className='flex-1 flex items-center justify-center overflow-x-auto px-8'>
        <div className='flex space-x-12'>
          {levels.map((level) => {
            const isUnlocked = level.id <= state.currentLevel;
            return (
              <button
                key={level.id}
                disabled={!isUnlocked}
                onClick={() => setSelectedLevel(level)}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center 
                  ${isUnlocked ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'} 
                  shadow-md transition`}
              >
                {isUnlocked ? (
                  level.id
                ) : (
                  <span className='material-icons'>lock</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Budget Modal --- */}
      {showBudget && (
        <BudgetModal
          onClose={() => setShowBudget(false)}
          budget={state.budget}
        />
      )}

      {/* --- Level Intro Modal --- */}
      {selectedLevel && (
        <LevelIntroModal
          level={selectedLevel}
          onClose={() => setSelectedLevel(null)}
          onStart={() => {
            onEnterLevel(selectedLevel);
            setSelectedLevel(null);
          }}
        />
      )}
    </div>
  );
};

export default GameMap;
