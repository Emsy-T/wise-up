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
import { levels } from '../data/levels';

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

  const confirmChoice = (currentState, choice: Choice) => {
    /* Define the new player state to be the player state after the effect of the player's decisions has been applied */
    const newState = applyEffect(currentState, choice);

    const result: LevelResult = {
      moneyChange: choice.effect.money ?? 0,
      savingsChange: choice.effect.savings ?? 0,
      success: true, // Placeholder: evaluate based on challenge rules
    };

    // Allow the app to move to the next decision if there is more than one decision in a level
    if (decisionIndex < level.decisions.length - 1) {
      setDecisionIndex(decisionIndex + 1);
    } else {
      /* Make sure the player's state only updates after all the decisions for the level have been made*/
      setCurrentState(newState);
      setShowFeedback(true);
      onComplete(result);
    }
  };

  return (
    <div className='relative h-screen w-full bg-gray-100 flex flex-col'>
      {/* Top Left: Player Stats */}
      <div className='absolute top-4 left-4'>
        <PlayerStats money={playerState.money} savings={playerState.savings} />
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
            savingsChange: currentState.savings - currentState.savings,
            success: true,
            /* TODO: Establish conditions for level success */
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
