// FeedbackPanel.tsx

import React from 'react';
import type { LevelResult, PlayerState } from '../types/gameTypes';

interface FeedbackPanelProps {
  result: LevelResult;
  playerState: PlayerState;
  onHome: () => void;
  onNext: () => void;
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  result,
  playerState,
  onHome,
  onNext,
}) => {
  const feedbackMessage = result.success
    ? 'You made smart financial decisions this level.'
    : 'Some of your choices hurt your finances. Try managing your spending more carefully.';

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4'>
      <div
        className='w-full max-w-lg rounded-3xl bg-[#111827] border border-white/10 shadow-2xl p-8 text-white animate-fadeInScale'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className='mb-6'>
          <h2 className='text-3xl font-bold text-orange-400'>Level Complete</h2>

          <p className='text-gray-400 mt-2'>Here's how you performed.</p>
        </div>

        {/* Stats */}
        <div className='space-y-4 mb-8'>
          <div className='flex justify-between items-center bg-white/5 rounded-2xl p-4'>
            <span className='text-gray-300'>Money Change</span>

            <span
              className={`font-bold ${
                result.moneyChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              ₦ {result.moneyChange.toLocaleString()}
            </span>
          </div>

          <div className='flex justify-between items-center bg-white/5 rounded-2xl p-4'>
            <span className='text-gray-300'>Savings Change</span>

            <span
              className={`font-bold ${
                result.savingsChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              ₦ {result.savingsChange.toLocaleString()}
            </span>
          </div>

          <div className='flex justify-between items-center bg-white/5 rounded-2xl p-4'>
            <span className='text-gray-300'>Current Balance</span>

            <span className='font-bold text-orange-300'>
              ₦ {playerState.money.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Message */}
        <div className='bg-white/5 rounded-2xl p-4 mb-8'>
          <p className='text-gray-300 leading-relaxed'>{feedbackMessage}</p>
        </div>

        {/* Buttons */}
        <div className='flex gap-4'>
          <button
            onClick={onHome}
            className='flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition'
          >
            Home
          </button>

          <button
            onClick={onNext}
            className='flex-1 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 transition font-semibold'
          >
            Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPanel;
