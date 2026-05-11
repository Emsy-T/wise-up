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
    <div className='w-full rounded-t-[2rem] border-t border-white/10 bg-[#102030]/95 backdrop-blur-xl shadow-2xl px-8 py-6'>
      {/* Prompt */}
      <div className='mb-6'>
        <p className='text-white text-xl font-semibold leading-relaxed'>
          {decision.prompt}
        </p>
      </div>

      {/* Choices + Confirm */}
      <div className='flex gap-6 items-stretch'>
        {/* LEFT SIDE — CHOICES */}
        <div className='flex-1 flex flex-col gap-4'>
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
        <div className='flex items-end'>
          <button
            onClick={() => selectedChoice && onConfirm(selectedChoice)}
            disabled={!selectedChoice}
            className='w-20 h-20 rounded-2xl bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:opacity-50 text-white text-4xl font-bold transition shadow-lg'
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionBox;
