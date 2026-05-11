// App.tsx

import React, { useState, useEffect } from 'react';

import { SplashScreen } from './components/SplashScreen';
import GameMap from './components/GameMap';
import LevelScreen from './components/LevelScreen';

import type { Level, PlayerState } from './types/gameTypes';

import { loadGame, saveGame } from './logic/gameLogic';

import { levels } from './data/levels';

type Screen = 'splash' | 'map' | 'level';

const App: React.FC = () => {
  const [state, setPlayerState] = useState<PlayerState>(loadGame());

  const [screen, setScreen] = useState<Screen>('splash');

  const [activeLevel, setActiveLevel] = useState<Level | null>(null);

  const [hasStartedGame, setHasStartedGame] = useState(false);

  // Save game automatically
  useEffect(() => {
    saveGame(state);
  }, [state]);

  // Start game
  const handleStartGame = () => {
    setHasStartedGame(true);
    setScreen('map');
  };

  // Open level
  const handleEnterLevel = (level: Level) => {
    setActiveLevel(level);
    setScreen('level');
  };

  // Exit level
  const handleExitLevel = () => {
    setActiveLevel(null);
    setScreen('map');
  };

  return (
    <>
      {/* SPLASH */}
      {screen === 'splash' && <SplashScreen onStart={handleStartGame} />}

      {/* MAP */}
      {screen === 'map' && (
        <GameMap
          state={state}
          levels={levels}
          onEnterLevel={handleEnterLevel}
          onUpdateState={setPlayerState}
          gameStarted={hasStartedGame}
        />
      )}

      {/* LEVEL */}
      {screen === 'level' && activeLevel && (
        <LevelScreen
          level={activeLevel}
          playerState={state}
          setPlayerState={setPlayerState}
          onExit={handleExitLevel}
        />
      )}
    </>
  );
};

export default App;
