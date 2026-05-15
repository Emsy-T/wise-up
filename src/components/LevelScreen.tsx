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

  /* ---------------- CURRENT DECISION ---------------- */
  const currentDecision: Decision = currentDecisionId
    ? level.decisions.find((d) => d.id === currentDecisionId)!
    : level.decisions[decisionIndex];

  /* ---------------- HANDLE CHOICE ---------------- */
  const confirmChoice = (choice: Choice) => {
    // BRANCH FLOW
    if (choice.nextDecisionId) {
      setCurrentDecisionId(choice.nextDecisionId);
      return;
    }

    // SEQUENTIAL FLOW
    if (decisionIndex < level.decisions.length - 1) {
      setDecisionIndex((prev) => prev + 1);
      setCurrentDecisionId(undefined);
      return;
    }

    // LEVEL COMPLETE
    const result: LevelResult = {
      moneyChange: choice.effect.money ?? 0,
      savingsChange: choice.effect.savings ?? 0,
      success: playerState.money > 0,
    };

    setShowFeedback(true);

    onComplete(result, playerState, choice);
  };

  return (
    <div className='relative h-screen w-full overflow-y-auto bg-gray-100 text-white flex flex-col'>
      {/* ---------------- TOP BAR ---------------- */}
      <div className='absolute top-0 left-0 right-0 z-20 px-6 py-5 flex items-start justify-between'>
        {/* LEFT: PLAYER STATS + BUDGET */}
        <div className='flex items-center gap-4'>
          <PlayerStats
            money={playerState.money}
            savings={playerState.savings}
          />

          <button
            onClick={() => setShowBudget(true)}
            className='bg-white transition rounded-2xl px-4 py-3 flex flex-col items-center shadow-lg cursor-pointer hover:bg-gray-100'
          >
            <ReceiptText size={22} className='text-orange-400' />
            <span className='text-xs mt-1 text-gray-600'>Budget</span>
          </button>
        </div>

        {/* CENTER: LEVEL HEADER (RESTORED) */}
        <div className='absolute left-1/2 -translate-x-1/2'>
          <LevelHeader levelNumber={level.id} title={level.title} />
        </div>

        {/* RIGHT: HELP */}
        <button className='w-12 h-12 rounded-2xl bg-yellow-400 hover:bg-yellow-300 transition flex items-center justify-center shadow-lg cursor-pointer'>
          <HelpCircle size={22} className='text-black' />
        </button>
      </div>

      {/* ---------------- DECISION PANEL ---------------- */}
      <div className='fixed bottom-0 left-0 right-0 min-h-[260px] bg-[#111827]/95 border-t border-white/10 backdrop-blur-xl px-8 py-6 flex gap-6 z-30'>
        <DecisionBox decision={currentDecision} onConfirm={confirmChoice} />
      </div>

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
