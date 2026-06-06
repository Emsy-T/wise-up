// WelcomeModal.tsx

import React from 'react';
import { X } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div
      className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
      onClick={onClose}
    >
      <div
        className='bg-slate-900 border border-white/10 text-white rounded-2xl sm:rounded-[28px] shadow-2xl w-full max-w-sm sm:w-[450px] p-6 sm:p-8 relative animate-fadeInScale'
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className='cursor-pointer absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-400 hover:text-white transition'
        >
          <X size={20} className='sm:size-[22px] text-black' />
        </button>

        {/* TITLE */}
        <h2 className='text-2xl sm:text-3xl font-bold text-orange-400 mb-6'>
          Welcome to WiseUp
        </h2>

        {/* CONTENT */}
        <div className='space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base'>
          <p>
            You’re about to step into a journey where every choice shapes your
            financial story.
          </p>
          <p>
            Spend wisely, build savings, manage your budget, and navigate
            real-life financial challenges.
          </p>
          <p>Every decision matters.</p>
          <p className='text-white font-medium pt-2'>Are you ready to play?</p>
        </div>

        {/* BUTTON */}
        <button
          onClick={onClose}
          className='cursor-pointer w-full mt-8 py-3 sm:py-4 bg-orange-500 hover:bg-orange-600 transition rounded-2xl font-semibold shadow-lg text-sm sm:text-base'
        >
          Yes, Let’s Start
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
