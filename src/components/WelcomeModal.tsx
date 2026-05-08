import React from 'react';

interface WelcomeModalProps {
  onClose: () => void; //Callback to close modal
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-200'
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className='bg-white rounded-lg shadow-lg w-96 p-6 relative animate-fadeInScale'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button (top-right corner) */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
          aria-label='Close Budget Modal'
        >
          <span className='material-icons'>close</span>
        </button>

        {/* Modal Title */}
        <h2 className='text-xl font-bold text-orange-500 mb-4'>
          Welcome to WiseUp!
        </h2>

        {/* Welcome Message */}
        <div>
          <p className='text-gray-700 leading-relaxed mb-3'>
            You’re about to step into a journey where every choice shapes your
            financial story. Start with what you have, make smart decisions, and
            see how your savings and spending grow.
          </p>
          <p className='text-gray-700 leading-relaxed mb-3'>
            Each level brings new challenges — test your budgeting skills,
            unlock progress, and discover how wise choices can lead to financial
            success.
          </p>
          <p className='text-gray-700 leading-relaxed mb-3'>
            Are you ready to wise up in your finance?
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={onClose}
          className='w-full mt-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition'
        >
          Yes, Let’s Start
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
