// GameMap.tsx

import React, { useState } from 'react';
import type { PlayerState, Level } from '../types/gameTypes';

import { ReceiptText } from 'lucide-react';

import PlayerStats from './PlayerStats';
import BudgetModal from './BudgetModal';
import LevelIntroModal from './LevelIntro';

interface GameMapProps {
  state: PlayerState;
  levels: Level[];
  onEnterLevel: (level: Level) => void;
  onUpdateState: React.Dispatch<React.SetStateAction<PlayerState>>;
  gameStarted: boolean;
}

const GameMap: React.FC<GameMapProps> = ({ state, levels, onEnterLevel }) => {
  const [showBudget, setShowBudget] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

  return (
    <div className='relative h-screen w-full overflow-y-auto bg-gray-100 flex flex-col'>
      {/* --- TOP UI --- */}
      <div className='absolute top-4 left-4 flex items-center space-x-4 z-10'>
        <PlayerStats money={state.money} savings={state.savings} />

        <button
          onClick={() => setShowBudget(true)}
          className='bg-white transition rounded-2xl px-4 py-3 flex flex-col items-center shadow-lg cursor-pointer'
        >
          <ReceiptText size={22} className='text-orange-400' />
          <span className='text-xs mt-1 text-gray-600'>Budget</span>
        </button>
      </div>

      {/* --- MAP AREA --- */}
      <div className='flex-1 flex items-center justify-center'>
        <div className='grid grid-cols-3 gap-12'>
          {levels.map((level, index) => {
            const isUnlocked = level.id <= state.currentLevel;
            const isCompleted = level.id < state.currentLevel;

            return (
              <div
                key={level.id}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}
              >
                <button
                  disabled={!isUnlocked || isCompleted}
                  onClick={() => setSelectedLevel(level)}
                  className={`cursor-pointer
                    w-16 h-16 rounded-full flex items-center justify-center shadow-md transition
                    ${
                      isCompleted
                        ? 'bg-green-500 text-white cursor-not-allowed opacity-70'
                        : isUnlocked
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {isCompleted ? (
                    '✓'
                  ) : isUnlocked ? (
                    level.id
                  ) : (
                    <span className='material-icons text-sm'>locked</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- BUDGET MODAL --- */}
      {showBudget && (
        <BudgetModal
          onClose={() => setShowBudget(false)}
          budget={state.budget}
        />
      )}

      {/* --- LEVEL INTRO MODAL --- */}
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

      {/* DISCLAIMER */}
      <div className='w-full text-center text-xs bg-amber-100 text-gray-500 py-4 px-6'>
        Disclaimer: Prices and financial situations in WiseUp are fictional
        simulations created for educational gameplay purposes and may not
        accurately reflect real-world market prices.
      </div>
    </div>
  );
};

export default GameMap;
