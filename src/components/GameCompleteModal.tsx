import React from 'react';
import { isGameWon, isGameSurvived } from '../logic/gameLogic';

interface GameCompleteModalProps {
  onReplay: () => void;
}

const GameCompleteModal: React.FC<GameCompleteModalProps> = ({
  playerState,
  onReplay,
}) => {
  // Create a function to restart the game and clear the browser storage so that users can have a clean slate for a new game
  const handleReplay = () => {
    localStorage.clear();
    onReplay();
  };
  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      {/* Modal Container */}
      <div className='bg-white rounded-lg shadow-lg w-96 p-6 relative'>
        {/* Modal Title */}
        <h2 className='text-xl font-bold text-orange-500 mb-4'>Game Over!</h2>

        {/* Game Over Message */}
        <div>
          <p className='text-gray-700 leading-relaxed mb-3'>
            Sorry, looks like you ran out of money. How did you spend it all?
            😲{' '}
          </p>
          <p className='text-gray-700 leading-relaxed mb-3'>
            Do you want to play again?
          </p>
        </div>

        {/* Restart Game Button */}
        <button
          onClick={handleReplay}
          className='w-full mt-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition'
        >
          Replay
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
