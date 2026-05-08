import React, { useState } from 'react';
import type { Decision, Choice } from '../types/gameTypes';
import ChoiceButton from './ChoiceButton';

interface DecisionBoxProps {
  decision: Decision; // Current decision prompt + choices
  onConfirm: (choice: Choice) => void; // Callback when confirm button pressed
}

const DecisionBox: React.FC<DecisionBoxProps> = ({ decision, onConfirm }) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  return (
    <div className='bg-white rounded-lg shadow-lg w-[600px] p-6 flex flex-col space-y-6'>
      {/* Prompt */}
      <p className='text-gray-700 font-medium'>{decision.prompt}</p>

      {/* Choice Buttons */}
      <div className='flex space-x-4'>
        {decision.choices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            isSelected={selectedChoice?.id === choice.id}
            onSelect={setSelectedChoice}
          />
        ))}
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => selectedChoice && onConfirm(selectedChoice)}
        disabled={!selectedChoice}
        className='self-center w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md hover:bg-green-600 transition disabled:opacity-50'
      >
        ✓
      </button>
    </div>
  );
};

export default DecisionBox;
