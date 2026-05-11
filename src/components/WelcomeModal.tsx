// WelcomeModal.tsx

import React from 'react';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div
      className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-slate-900 border border-white/10 text-white rounded-[28px] shadow-2xl w-[450px] p-8 relative animate-fadeInScale'
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-white transition'
        >
          <span className='material-icons'>close</span>
        </button>

        {/* TITLE */}
        <h2 className='text-3xl font-bold text-orange-400 mb-6'>
          Welcome to WiseUp
        </h2>

        {/* CONTENT */}
        <div className='space-y-4 text-gray-300 leading-relaxed'>
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
          className='w-full mt-8 py-4 bg-orange-500 hover:bg-orange-600 transition rounded-2xl font-semibold shadow-lg'
        >
          Yes, Let’s Start
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
