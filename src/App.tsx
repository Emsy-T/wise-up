import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import GameMap from './components/GameMap';
import type { PlayerState } from './types/gameTypes';
import './App.css';

const App: React.FC = () => {
  // Check whether player has started playing the game and store their state
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  return (
    <>
      {!playerState ? (
        // Show SplashScreen until "Start Game" is pressed
        <SplashScreen onStart={(state) => setPlayerState(state)} />
      ) : (
        // Once started, show the Game Map with the player's state
        <GameMap playerState={playerState} />
      )}
    </>
  );
};
