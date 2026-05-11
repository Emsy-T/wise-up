// App.tsx

import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import GameMap from './components/GameMap';
import type { Level, PlayerState } from './types/gameTypes';
import { loadGame, saveGame } from './logic/gameLogic';
import { levels } from './data/levels'; // import levels
import './App.css';

const App: React.FC = () => {
  // Initialize state directly from localStorage
  const [state, setPlayerState] = useState<PlayerState | null>(() =>
    loadGame(),
  );

  // Save state whenever it changes
  useEffect(() => {
    if (state) {
      saveGame(state);
    }
  }, [state]);

  // Callback when player enters a level
  const handleEnterLevel = (level: Level) => {
    console.log('Entering level:', level.id);
    // You can extend this to actually start the level gameplay
  };

  return (
    <>
      {!state ? (
        <SplashScreen onStart={(state) => setPlayerState(state)} />
      ) : (
        <GameMap
          state={state}
          levels={levels}
          onEnterLevel={handleEnterLevel}
          onUpdateState={setPlayerState}
        />
      )}
    </>
  );
};

export default App;
