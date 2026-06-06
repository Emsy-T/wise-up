// BudgetModal.tsx

import React from 'react';
import type { PlayerState } from '../types/gameTypes';
import { X } from 'lucide-react';

interface BudgetModalProps {
  budget?: PlayerState['budget']; // Budget object from player state
  onClose: () => void; // Callback to close the modal
}

const BudgetModal: React.FC<BudgetModalProps> = ({ budget, onClose }) => {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4'
      onClick={onClose}
    >
      {/* Modal container */}
      <div className='bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-4 sm:p-6 relative'>
        {/* Close button (top-right corner) */}
        <button
          onClick={onClose}
          className='cursor-pointer absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700'
          aria-label='Close Budget Modal'
        >
          <X size={20} className='sm:size-[22px] text-black' />
        </button>

        {/* Modal Title */}
        <h2 className='text-lg sm:text-xl font-bold text-orange-500 mb-4'>
          Your Budget
        </h2>

        {/* Budget Categories */}
        <div className='space-y-3'>
          {/* Food */}
          <div className='flex justify-between items-center text-sm sm:text-base'>
            <span className='text-gray-700'>Food</span>
            <span className='font-semibold text-gray-900'>
              ₦ {budget?.food?.toLocaleString() ?? '?'}
            </span>
          </div>

          {/* Transport */}
          <div className='flex justify-between items-center text-sm sm:text-base'>
            <span className='text-gray-700'>Transport</span>
            <span className='font-semibold text-gray-900'>
              ₦ {budget?.transport?.toLocaleString() ?? '?'}
            </span>
          </div>

          {/* Social */}
          <div className='flex justify-between items-center text-sm sm:text-base'>
            <span className='text-gray-700'>Social</span>
            <span className='font-semibold text-gray-900'>
              ₦ {budget?.social?.toLocaleString() ?? '?'}
            </span>
          </div>

          {/* Tolietries */}
          <div className='flex justify-between items-center text-sm sm:text-base'>
            <span className='text-gray-700'>Toiletries</span>
            <span className='font-semibold text-gray-900'>
              ₦ {budget?.toiletries?.toLocaleString() ?? '?'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;
