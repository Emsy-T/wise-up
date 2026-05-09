import React from 'react';
import type { PlayerState } from '../types/gameTypes';
import { evaluateGame } from '../logic/gameLogic';

interface GameCompleteModalProps {
  playerState: PlayerState;
  onReplay: () => void;
}

const GameCompleteModal: React.FC<GameCompleteModalProps> = ({
  onReplay,
  playerState,
}) => {
  // Create an outcome variable which stores the result of the evaluateGame function
  const outcome = evaluateGame(playerState);

  // Depending on whether the player wins or survives the game, they may get different titles and messages
  const title =
    outcome === 'win' ? 'Congratulations! You Won! 🎉' : 'You Survived! 💪';

  const message =
    outcome === 'win'
      ? 'You finished the game with ₦${playerState.money} left. Your wise choices paid off!'
      : "You made it through with ₦${playerState.money} left. It may not be the most stable financial state, but it's definitely better than nothing.";

  // Create a function to restart the game and clear the browser storage so that users can have a clean slate for a new game
  const handleReplay = () => {
    localStorage.clear();
    onReplay();
  };
  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      {/* Modal Container */}
      <div className='bg-white rounded-lg shadow-lg w-96 p-6 relative animate-fadeInScale'>
        {/* Modal Title */}
        <h2 className='text-xl font-bold text-orange-500 mb-4'>{title}</h2>

        {/* Game Over Message */}
        <div>
          <p className='text-gray-700 leading-relaxed mb-3'>{message}</p>
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

export default GameCompleteModal;
