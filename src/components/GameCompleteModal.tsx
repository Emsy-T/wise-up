// GameCompleteModal.tsx

import React from 'react';
import type { PlayerState } from '../types/gameTypes';
import { evaluateGame } from '../logic/gameLogic';

interface GameCompleteModalProps {
  playerState: PlayerState;
  onReplay: () => void;
}

const GameCompleteModal: React.FC<GameCompleteModalProps> = ({
  playerState,
  onReplay,
}) => {
  const outcome = evaluateGame(playerState);

  const title = outcome === 'win' ? 'Congratulations! 🎉' : 'You Survived 💪';

  const message =
    outcome === 'win'
      ? `You completed the game with ₦${playerState.money.toLocaleString()} remaining. Your financial decisions paid off.`
      : `You made it through the game with ₦${playerState.money.toLocaleString()} left. Things were tough, but you survived.`;

  const handleReplay = () => {
    localStorage.clear();
    onReplay();
  };

  return (
    <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4'>
      <div className='w-full max-w-md bg-[#111827] border border-white/10 rounded-3xl p-8 text-white shadow-2xl animate-fadeInScale'>
        <h2 className='text-3xl font-bold text-orange-400 mb-4'>{title}</h2>

        <p className='text-gray-300 leading-relaxed mb-8'>{message}</p>

        <button
          onClick={handleReplay}
          className='w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 transition font-semibold'
        >
          Replay Game
        </button>
      </div>
    </div>
  );
};

export default GameCompleteModal;
