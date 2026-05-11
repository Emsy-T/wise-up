import React, { useState } from 'react';
import type {
  Level,
  Choice,
  PlayerState,
  LevelResult,
} from '../types/gameTypes';
import PlayerStats from './PlayerStats';
import LevelHeader from './LevelHeader';
import DecisionBox from './DecisionBox';
import FeedbackPanel from './FeedbackPanel';
import { applyEffect } from '../logic/gameLogic';

interface LevelScreenProps {
  level: Level;
  playerState: PlayerState;
  onComplete: (result: LevelResult) => void;
}

const LevelScreen: React.FC<LevelScreenProps> = ({
  level,
  playerState,
  onComplete,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [decisionIndex, setDecisionIndex] = useState(0);
  const [currentState, setCurrentState] = useState<PlayerState>(playerState);

  const currentDecision = level.decisions[decisionIndex];

  const confirmChoice = (choice: Choice) => {
    // Apply effect of choice
    const newState = applyEffect(currentState, choice);

    // Update local state immediately
    setCurrentState(newState);

    // Build result object
    const result: LevelResult = {
      moneyChange: choice.effect.money ?? 0,
      savingsChange: choice.effect.savings ?? 0,
      success: true, // TODO: add challenge-specific success logic
    };

    // If more decisions remain, move to next
    if (decisionIndex < level.decisions.length - 1) {
      setDecisionIndex(decisionIndex + 1);
    } else {
      // End of level: show feedback and notify parent
      setShowFeedback(true);
      onComplete(result);
    }
  };

  return (
    <div className='relative h-screen w-full bg-gray-100 flex flex-col'>
      {/* Top Left: Player Stats */}
      <div className='absolute top-4 left-4'>
        <PlayerStats
          money={currentState.money}
          savings={currentState.savings}
        />
      </div>

      {/* Top Center: Level Header */}
      <div className='absolute top-4 left-1/2 transform -translate-x-1/2'>
        <LevelHeader levelNumber={level.id} title={level.title} />
      </div>

      {/* Top Right: Hint Button */}
      <div className='absolute top-4 right-4'>
        <button
          className='w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow hover:bg-yellow-500 transition'
          aria-label='Hint'
        >
          <span className='font-bold text-white'>?</span>
        </button>
      </div>

      {/* Main Gameplay Area */}
      <div className='flex-1 flex items-center justify-center'>
        <DecisionBox decision={currentDecision} onConfirm={confirmChoice} />
      </div>

      {/* Feedback Panel */}
      {showFeedback && (
        <FeedbackPanel
          result={{
            moneyChange: currentState.money - playerState.money,
            savingsChange: currentState.savings - playerState.savings,
            success: true,
          }}
          playerState={currentState}
          onHome={() => console.log('Go back to Game Map')}
          onNext={() => console.log('Go to Next Level')}
        />
      )}
    </div>
  );
};

export default LevelScreen;
