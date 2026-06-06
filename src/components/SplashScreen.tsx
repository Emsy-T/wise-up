// SplashScreen.tsx

import React, { useState, useEffect } from 'react';
import { loadGame, saveGame } from '../logic/gameLogic';
import type { PlayerState } from '../types/gameTypes';

interface SplashScreenProps {
  onStart: (state: PlayerState) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  // Check whether the app is loading and track the progress of the loading bar
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
        return Math.min(prev + 1, 100);
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    const state = loadGame(); // load saved or default state
    saveGame(state); // ensure persistence
    onStart(state); // pass state up to App
  };

  return (
    <div className='h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center justify-center px-4 sm:px-6'>
      {/* Logo / Title */}
      <div className='flex flex-col items-center animate-fadeUp'>
        <div className='w-16 h-16 sm:w-20 md:w-24 rounded-2xl sm:rounded-3xl bg-orange-500 shadow-glow flex items-center justify-center mb-4 sm:mb-6'>
          <span className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>
            ₦
          </span>
        </div>

        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight'>
          Wise<span className='text-orange-500'>Up</span>
        </h1>

        <p className='text-slate-400 mt-2 sm:mt-3 text-center max-w-xs sm:max-w-sm text-sm sm:text-base'>
          Every financial choice shapes your future.
        </p>
      </div>

      {/* Loading Section */}
      {loading ? (
        <div className='mt-12 sm:mt-16 w-full max-w-xs sm:max-w-sm animate-fadeIn px-2'>
          {/* Loading Text */}
          <div className='flex justify-between text-xs sm:text-sm text-slate-400 mb-3'>
            <span>Loading game...</span>
            <span>{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div className='w-full h-2 sm:h-3 bg-slate-700 rounded-full overflow-hidden'>
            <div
              className='h-full bg-orange-500 transition-all duration-300'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className='mt-12 sm:mt-16 animate-fadeUp'>
          <button
            onClick={handleStart}
            className='cursor-pointer
            px-6 sm:px-8
            py-3 sm:py-4
            bg-orange-500
            hover:bg-orange-600
            text-white
            rounded-lg sm:rounded-2xl
            text-base sm:text-lg
            font-semibold
            shadow-glow
            transition-all
            duration-300
            hover:scale-105
          '
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};
