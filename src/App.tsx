// App.tsx

import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import GameMap from './components/GameMap';
import LevelScreen from './components/LevelScreen';
import WelcomeModal from './components/WelcomeModal';

import type {
  Level,
  PlayerState,
  LevelResult,
  Choice,
} from './types/gameTypes';
import {
  loadGame,
  saveGame,
  nextLevel,
  applyEffect,
  isGameOver,
} from './logic/gameLogic';
import { levels } from './data/levels';

type Screen = 'splash' | 'map' | 'level';

const App: React.FC = () => {
  const [state, setPlayerState] = useState<PlayerState>(() => loadGame());
  const [screen, setScreen] = useState<Screen>('splash');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [hasStartedGame, setHasStartedGame] = useState(false);

  // Welcome modal only once per user
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('wiseup-welcome-seen');
  });

  // Save game whenever state changes
  useEffect(() => {
    saveGame(state);
  }, [state]);

  const handleStartGame = () => {
    setHasStartedGame(true);
    setScreen('map');
  };

  const handleEnterLevel = (level: Level) => {
    setActiveLevel(level);
    setScreen('level');
  };

  const handleCompleteLevel = (
    result: LevelResult,
    stateFromLevel: PlayerState,
    finalChoice: Choice,
  ) => {
    const updated = applyEffect(stateFromLevel, finalChoice);

    // Check for game over before progressing
    if (isGameOver(updated)) {
      // You can set a special screen or flag here
      setScreen('splash'); // or 'gameover' if you add a GameOver screen
      return;
    }

    const progressed = nextLevel(updated);
    setPlayerState(progressed);
    setActiveLevel(null);
    setScreen('map');
  };

  return (
    <>
      {screen === 'splash' && <SplashScreen onStart={handleStartGame} />}

      {screen === 'map' && (
        <>
          {showWelcome && (
            <WelcomeModal
              onClose={() => {
                localStorage.setItem('wiseup-welcome-seen', 'true');
                setShowWelcome(false);
              }}
            />
          )}
          <GameMap
            state={state}
            levels={levels}
            onEnterLevel={handleEnterLevel}
            onUpdateState={setPlayerState}
            gameStarted={hasStartedGame}
          />
        </>
      )}

      {screen === 'level' && activeLevel && (
        <LevelScreen
          level={activeLevel}
          playerState={state}
          onComplete={handleCompleteLevel}
        />
      )}
    </>
  );
};

export default App;
