// ChoiceButton.tsx

import React from 'react';
import type { Choice } from '../types/gameTypes';

interface ChoiceButtonProps {
  choice: Choice;
  isSelected: boolean;
  onSelect: (choice: Choice) => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(choice)}
      className={`
        w-full p-5 rounded-2xl border text-left transition-all duration-200

        ${
          isSelected
            ? 'bg-orange-500 border-orange-300 text-white shadow-xl scale-[1.01]'
            : 'bg-white/10 border-white/10 text-white hover:bg-white/20'
        }
      `}
    >
      <p className='leading-relaxed font-medium'>{choice.text}</p>
    </button>
  );
};

export default ChoiceButton;
