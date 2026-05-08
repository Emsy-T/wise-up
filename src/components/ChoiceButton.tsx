import React from 'react';
import type { Choice } from '../types/gameTypes';

interface ChoiceButtonProps {
  choice: Choice; // Choice data (id, text, effect)
  isSelected: boolean; // Whether this choice is currently selected
  onSelect: (choice: Choice) => void; // Callback when clicked
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      onClick={() => onSelect(choice)}
      className={`flex-1 py-3 rounded-lg shadow-md transition 
        ${
          isSelected
            ? 'bg-orange-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
    >
      {choice.text}
    </button>
  );
};

export default ChoiceButton;
