// LevelScreen.tsx

import React, { useState } from 'react';
import { HelpCircle, ReceiptText } from 'lucide-react';

import type {
  Level,
  Choice,
  PlayerState,
  LevelResult,
  Decision,
} from '../types/gameTypes';
import PlayerStats from './PlayerStats';
import LevelHeader from './LevelHeader';
import DecisionBox from './DecisionBox';
import FeedbackPanel from './FeedbackPanel';
import BudgetModal from './BudgetModal';

interface LevelScreenProps {
  level: Level;
  playerState: PlayerState;
  onComplete: (
    result: LevelResult,
    state: PlayerState,
    finalChoice: Choice,
  ) => void;
}

const LevelScreen: React.FC<LevelScreenProps> = ({
  level,
  playerState,
  onComplete,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [currentDecisionId, setCurrentDecisionId] = useState<
    string | undefined
  >(undefined);

  // Local copy of state to apply effects during level
  const [localState, setLocalState] = useState<PlayerState>(playerState);

  const currentDecision: Decision = currentDecisionId
    ? level.decisions.find((d) => d.id === currentDecisionId)!
    : level.decisions[decisionIndex];

  const confirmChoice = (choice: Choice) => {
    // Apply choice effects
    const updatedState: PlayerState = {
      ...localState,
      money: localState.money + (choice.effect.money ?? 0),
      savings: localState.savings + (choice.effect.savings ?? 0),
      budget: {
        ...localState.budget,
        ...(choice.effect.budget ?? {}),
      },
    };
    setLocalState(updatedState);

    // Branch flow
    if (choice.nextDecisionId) {
      setCurrentDecisionId(choice.nextDecisionId);
      return;
    }

    // Sequential flow
    if (decisionIndex < level.decisions.length - 1) {
      setDecisionIndex((prev) => prev + 1);
      setCurrentDecisionId(undefined);
      return;
    }

    // Level complete
    const result: LevelResult = {
      moneyChange: choice.effect.money ?? 0,
      savingsChange: choice.effect.savings ?? 0,
      success: updatedState.money > 0,
    };

    setShowFeedback(true);
    onComplete(result, updatedState, choice); // push updated state back to App
  };

  return (
    <div className='relative h-screen w-full overflow-y-auto bg-gray-100 text-white flex flex-col'>
      {/* TOP BAR */}
      <div className='absolute top-0 left-0 right-0 z-20 px-3 sm:px-6 py-3 sm:py-5 flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0'>
        {/* LEFT: PLAYER STATS + BUDGET */}
        <div className='flex items-center gap-2 sm:gap-4 flex-wrap'>
          <div className='scale-75 sm:scale-100 origin-top-left sm:origin-center'>
            <PlayerStats
              money={localState.money}
              savings={localState.savings}
            />
          </div>
          <button
            onClick={() => setShowBudget(true)}
            className='bg-white transition rounded-lg sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex flex-col items-center shadow-lg cursor-pointer hover:bg-gray-100'
          >
            <ReceiptText size={18} className='sm:size-[22px] text-orange-400' />
            <span className='text-[10px] sm:text-xs mt-1 text-gray-600'>
              Budget
            </span>
          </button>
        </div>

        {/* CENTER: LEVEL HEADER */}
        <div className='hidden sm:block absolute left-1/2 top-3 sm:top-5 -translate-x-1/2'>
          <LevelHeader levelNumber={level.id} title={level.title} />
        </div>

        {/* Mobile: LEVEL HEADER */}
        <div className='sm:hidden w-full'>
          <LevelHeader levelNumber={level.id} title={level.title} />
        </div>

        {/* RIGHT: HELP */}
        <button className='w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-yellow-400 hover:bg-yellow-300 transition flex items-center justify-center shadow-lg cursor-pointer ml-auto sm:ml-0'>
          <HelpCircle size={20} className='sm:size-[22px] text-black' />
        </button>
      </div>

      {/* DECISION PANEL */}
      <div className='fixed bottom-0 left-0 right-0 min-h-[200px] sm:min-h-[260px] bg-[#111827]/95 border-t border-white/10 backdrop-blur-xl px-4 sm:px-8 py-4 sm:py-6 flex gap-3 sm:gap-6 z-30 overflow-x-auto'>
        <DecisionBox decision={currentDecision} onConfirm={confirmChoice} />
      </div>

      {/* Adjust main content area for smaller screens */}
      <div className='flex-1 pt-32 sm:pt-24 pb-60 sm:pb-72' />

      {/* ---------------- BUDGET MODAL ---------------- */}
      {showBudget && (
        <BudgetModal
          budget={playerState.budget}
          onClose={() => setShowBudget(false)}
        />
      )}

      {/* ---------------- FEEDBACK PANEL ---------------- */}
      {showFeedback && (
        <FeedbackPanel
          result={{
            moneyChange: 0,
            savingsChange: 0,
            success: true,
          }}
          playerState={playerState}
          onHome={() => {}}
          onNext={() => {}}
        />
      )}
    </div>
  );
};

export default LevelScreen;
