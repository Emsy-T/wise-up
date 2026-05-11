import React, { useState } from 'react';
import type { PlayerState, Level } from '../types/gameTypes';

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

const GameMap: React.FC<GameMapProps> = ({
  state,
  levels,
  onEnterLevel,
  gameStarted,
}) => {
  const [showBudget, setShowBudget] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className='relative h-screen w-full bg-gradient-to-b from-green-200 to-blue-200 flex flex-col'>
      {/* --- TOP UI --- */}
      <div className='absolute top-4 left-4 flex items-center space-x-4 z-10'>
        <PlayerStats money={state.money} savings={state.savings} />

        <button
          onClick={() => setShowBudget(true)}
          className='p-2 bg-white rounded-full shadow hover:bg-gray-200 transition'
          aria-label='Open Budget'
        >
          <span className='material-icons text-orange-500'>receipt_long</span>
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
                className={`flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } relative`}
              >
                <button
                  disabled={!isUnlocked}
                  onClick={() => setSelectedLevel(level)}
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center shadow-md transition
                    ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isUnlocked
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-300 text-gray-500'
                    }
                  `}
                >
                  {isUnlocked ? (
                    level.id
                  ) : (
                    <span className='material-icons'>lock</span>
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

      {/* --- WELCOME MODAL --- */}
      {showWelcome && gameStarted && (
        <div className='absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md text-center animate-fadeIn'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>
              Welcome to WiseUp
            </h2>

            <p className='text-gray-600 mb-6 leading-relaxed'>
              You are about to step into a journey where every choice shapes
              your financial story. Start with what you have, make smart
              decisions, and see how your savings and spending grow.
              <br />
              <br />
              Are you ready to play?
            </p>

            <button
              onClick={() => setShowWelcome(false)}
              className='px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition'
            >
              Yes, Let’s Start
            </button>
          </div>
        </div>
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
    </div>
  );
};

export default GameMap;
