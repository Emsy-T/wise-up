import React, { useState, useEffect } from 'react';
import {loadGame, saveGame} from '../logic/gameLogic';
import type {PlayerState} from '../types/gameTypes';

interface SplashScreenProps {
  onStart: (state: PlayerState) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
    // Track whether the application is loading and track the progress of the loading bar
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Create an interval that makes the loading bar move every 100ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        // When the bar reaches 100%, the interval counting stops
        if (prev >= 100) {
          clearInterval(interval);
          // The loading state switches off to show the app name + play button
          setLoading(false);
          return 100;
        }
        return prev + 34;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    const state = loadGame(); // load saved or default state
    saveGame(state); // ensure persistence
    onStart(state); // pass state up to App
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {loading ? (
        // Show loading bar while progress < 100%
        <div className="w-64 h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : (
        // Once loading is complete, show title + start button
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-5xl font-bold text-orange-500">WiseUp!</h1>
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};