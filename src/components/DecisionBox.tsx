// DecisionBox.tsx

import React, { useState } from 'react';
import type { Decision, Choice } from '../types/gameTypes';
import ChoiceButton from './ChoiceButton';

interface DecisionBoxProps {
  decision: Decision;
  onConfirm: (choice: Choice) => void;
}

const DecisionBox: React.FC<DecisionBoxProps> = ({ decision, onConfirm }) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);

  return (
    <div className='w-full rounded-t-lg sm:rounded-t-[2rem] border-t border-white/10 bg-[#102030]/95 backdrop-blur-xl shadow-2xl px-4 sm:px-8 py-4 sm:py-6'>
      {/* Prompt */}
      <div className='mb-4 sm:mb-6'>
        <p className='text-white text-base sm:text-lg md:text-xl font-semibold leading-relaxed'>
          {decision.prompt}
        </p>
      </div>

      {/* Choices + Confirm */}
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-6 items-stretch'>
        {/* LEFT SIDE — CHOICES */}
        <div className='flex-1 flex flex-col gap-2 sm:gap-4'>
          {decision.choices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              isSelected={selectedChoice?.id === choice.id}
              onSelect={setSelectedChoice}
            />
          ))}
        </div>

        {/* RIGHT SIDE — CONFIRM BUTTON */}
        <div className='flex items-end justify-end'>
          <button
            onClick={() => selectedChoice && onConfirm(selectedChoice)}
            disabled={!selectedChoice}
            className='cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-2xl bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:opacity-50 text-white text-2xl sm:text-4xl font-bold transition shadow-lg flex-shrink-0'
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionBox;
