import React from 'react';
import type { LevelResult, PlayerState } from '../types/gameTypes';

interface FeedbackPanelProps {
  result: LevelResult; // Breakdown of changes
  playerState: PlayerState; // Current player state
  onHome: () => void; // Navigate back to Game Map
  onNext: () => void; // Navigate to next level
}

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  result,
  playerState,
  onHome,
  onNext,
}) => {
  // Generate feedback message based on success
  const feedbackMessage = result.success
    ? 'You made very wise decisions!'
    : 'Interesting choices... You may want to rethink some spending habits.';

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div
        className='bg-white rounded-lg shadow-lg w-[500px] p-6 relative'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-2xl font-bold text-orange-500 mb-4'>
          Level Complete
        </h2>

        {/* Breakdown */}
        <div className='space-y-2 mb-4'>
          <p>Money Change: ₦ {result.moneyChange.toLocaleString()}</p>
          <p>Balance: ₦ {playerState.money.toLocaleString()}</p>
          <p>Savings Change: ₦ {result.savingsChange.toLocaleString()}</p>
        </div>

        {/* Feedback Message */}
        <p className='text-gray-700 mb-6'>{feedbackMessage}</p>

        {/* Buttons */}
        <div className='flex justify-between'>
          <button
            onClick={onHome}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition'
          >
            Home
          </button>
          <button
            onClick={onNext}
            className='px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition'
          >
            Next Level
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPanel;
