// LevelScreen.tsx

import React, { useState } from 'react';

import type { Level, Choice, PlayerState, Decision } from '../types/gameTypes';

import PlayerStats from './PlayerStats';
import LevelHeader from './LevelHeader';
import DecisionBox from './DecisionBox';
import FeedbackPanel from './FeedbackPanel';
import BudgetModal from './BudgetModal';

import { applyEffect, getDecision, isGameOver } from '../logic/gameLogic';

interface LevelScreenProps {
  level: Level;
  playerState: PlayerState;
  setPlayerState: React.Dispatch<React.SetStateAction<PlayerState>>;
  onExit: () => void;
}

const LevelScreen: React.FC<LevelScreenProps> = ({
  level,
  playerState,
  setPlayerState,
  onExit,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const [showBudget, setShowBudget] = useState(false);

  const [currentState, setCurrentState] = useState<PlayerState>(playerState);

  // Start at first decision
  const [currentDecisionId, setCurrentDecisionId] = useState(
    level.decisions[0].id,
  );

  // Get active decision
  const currentDecision: Decision | undefined = getDecision(
    level.id,
    currentDecisionId,
  );

  // Handle choice confirmation
  const confirmChoice = (choice: Choice) => {
    const updatedState = applyEffect(currentState, choice);

    // Update local level state
    setCurrentState(updatedState);

    // Update GLOBAL app state
    setPlayerState(updatedState);

    // GAME OVER
    if (isGameOver(updatedState)) {
      return;
    }

    // BRANCHING
    if (choice.nextDecisionId) {
      setCurrentDecisionId(choice.nextDecisionId);
      return;
    }

    // FIND CURRENT DECISION INDEX
    const currentIndex = level.decisions.findIndex(
      (decision) => decision.id === currentDecisionId,
    );

    // MOVE TO NEXT DECISION
    const nextDecision = level.decisions[currentIndex + 1];

    if (nextDecision) {
      setCurrentDecisionId(nextDecision.id);
    } else {
      // LEVEL COMPLETE
      setShowFeedback(true);
    }
  };

  if (!currentDecision) {
    return (
      <div className='h-screen flex items-center justify-center bg-slate-900 text-white'>
        Decision not found.
      </div>
    );
  }

  return (
    <div className='relative h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col'>
      {/* TOP BAR */}
      <div className='absolute top-0 left-0 right-0 z-20 px-6 py-5 flex justify-between items-start'>
        {/* LEFT */}
        <div className='flex items-center gap-4'>
          <PlayerStats
            money={currentState.money}
            savings={currentState.savings}
          />

          {/* Budget Button */}
          <button
            onClick={() => setShowBudget(true)}
            className='bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl px-4 py-3 flex flex-col items-center transition shadow-lg'
          >
            <span className='material-icons text-orange-400'>receipt_long</span>

            <span className='text-xs text-gray-300 mt-1'>Budget</span>
          </button>
        </div>

        {/* CENTER */}
        <div className='absolute left-1/2 -translate-x-1/2'>
          <LevelHeader levelNumber={level.id} title={level.title} />
        </div>

        {/* RIGHT */}
        <button className='w-12 h-12 rounded-2xl bg-yellow-400 hover:bg-yellow-300 transition flex items-center justify-center shadow-lg'>
          <span className='font-bold text-black text-lg'>?</span>
        </button>
      </div>

      {/* GAMEPLAY AREA */}
      <div className='flex-1 px-8 pt-28 pb-[300px]'>
        <div className='w-full h-full rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-2xl flex items-center justify-center'>
          <div className='text-center max-w-lg px-6'>
            <h2 className='text-4xl font-bold mb-4'>Gameplay Area</h2>

            <p className='text-gray-400 leading-relaxed'>
              Character scenes, room visuals, story illustrations, or future
              animations can appear here.
            </p>
          </div>
        </div>
      </div>

      {/* DECISION PANEL */}
      <div className='absolute bottom-0 left-0 right-0 h-[280px] bg-slate-900/95 border-t border-white/10 backdrop-blur-xl px-8 py-6'>
        <DecisionBox decision={currentDecision} onConfirm={confirmChoice} />
      </div>

      {/* BUDGET MODAL */}
      {showBudget && (
        <BudgetModal
          budget={currentState.budget}
          onClose={() => setShowBudget(false)}
        />
      )}

      {/* FEEDBACK */}
      {showFeedback && (
        <FeedbackPanel
          result={{
            moneyChange: currentState.money - playerState.money,

            savingsChange: currentState.savings - playerState.savings,

            success: currentState.money > 0,
          }}
          playerState={currentState}
          onHome={onExit}
          onNext={onExit}
        />
      )}
    </div>
  );
};

export default LevelScreen;
