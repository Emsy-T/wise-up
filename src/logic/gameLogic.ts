// gameLogic.ts

import type { PlayerState, Choice, Level } from '../types/gameTypes';
import { levels } from '../data/levels';

const totalLevels = 10;

/* ---------------- APPLY EFFECT ---------------- */
export function applyEffect(state: PlayerState, choice: Choice): PlayerState {
  const effect = choice.effect;

  const newState: PlayerState = {
    ...state,

    money: state.money + (effect.money ?? 0),
    savings: state.savings + (effect.savings ?? 0),

    budget: {
      food: state.budget?.food ?? 0,
      transport: state.budget?.transport ?? 0,
      social: state.budget?.social ?? 0,
      toiletries: state.budget?.toiletries ?? 0,

      ...(effect.budget ?? {}),
    },
  };

  return newState;
}

/* ---------------- LEVEL HELPERS ---------------- */
export function getLevel(levelId: number): Level | undefined {
  return levels.find((l) => l.id === levelId);
}

export function getDecision(levelId: number, decisionId: string) {
  const level = getLevel(levelId);
  return level?.decisions.find((d) => d.id === decisionId);
}

/* ---------------- NAVIGATION ---------------- */
export function nextDecision(state: PlayerState): PlayerState {
  return {
    ...state,
    decisionIndex: state.decisionIndex + 1,
    currentDecisionId: undefined,
  };
}

export function nextLevel(state: PlayerState): PlayerState {
  const next = state.currentLevel + 1;

  const updated = paySalary(next, state);

  return {
    ...updated,
    currentLevel: next,
    decisionIndex: 0,
    currentDecisionId: undefined,
  };
}

/* ---------------- GAME RULES ---------------- */
export function isGameOver(state: PlayerState): boolean {
  return state.money <= 0;
}

export function evaluateGame(
  state: PlayerState,
): 'win' | 'survived' | 'ongoing' {
  if (state.currentLevel >= totalLevels && state.money >= 10000) {
    return 'win';
  }

  if (state.currentLevel >= totalLevels && state.money > 0) {
    return 'survived';
  }

  return 'ongoing';
}

export function paySalary(
  currentLevel: number,
  state: PlayerState,
): PlayerState {
  const salary = 300000;

  if (currentLevel % 5 === 1) {
    return { ...state, money: state.money + salary };
  }

  return state;
}

/* ---------------- LOCAL STORAGE ---------------- */
const STORAGE_KEY = 'wiseup-game-state';

export function saveGame(state: PlayerState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('SAVE FAILED:', e);
  }
}

export function loadGame(): PlayerState {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('LOAD FAILED:', e);
    }
  }

  return {
    money: 100000,
    savings: 0,
    currentLevel: 1,
    decisionIndex: 0,
    currentDecisionId: undefined,
    budget: {
      food: 0,
      transport: 0,
      social: 0,
      toiletries: 0,
    },
  };
}
