// LevelIntro.tsx

import React from 'react';
import type { Level } from '../types/gameTypes';

import { X } from 'lucide-react';

interface LevelIntroModalProps {
  level: Level; // The level object with id, title, description
  onClose: () => void; // Callback to close the modal
  onStart: () => void; // Callback when player presses "Let's Go"
}

const LevelIntroModal: React.FC<LevelIntroModalProps> = ({
  level,
  onClose,
  onStart,
}) => {
  return (
    // Overlay background
    <div
      className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'
      onClick={onClose}
    >
      {/* Modal container */}
      <div className='bg-white rounded-lg shadow-lg w-96 p-6 relative'>
        {/* Close button (top-right corner) */}
        <button
          onClick={onClose}
          className='cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700'
          aria-label='Close Level Intro Modal'
        >
          <X size={22} className='text-black' />
        </button>

        {/* Level Info */}
        <h2 className='text-2xl font-bold text-orange-500 mb-2'>
          Level {level.id}: {level.title}
        </h2>

        {/* Challenge description */}
        <p className='text-gray-700 mb-6'>{level.description}</p>

        {/* "Let's Go" button */}
        <button
          onClick={onStart}
          className='cursor-pointer w-full py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition'
        >
          Let’s Go
        </button>
      </div>
    </div>
  );
};

export default LevelIntroModal;
