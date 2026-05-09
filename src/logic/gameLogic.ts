import type { PlayerState, Choice } from '../types/gameTypes';

// CREATE A FUNCTION TO APPLY THE EFFECT OF THE PLAYER'S CHOICE ON THEIR STATE
export function applyEffect(state: PlayerState, choice: Choice): PlayerState {
  const effect = choice.effect;
  return {
    ...state,

    // Update money available
    money: state.money + (effect.money ?? 0),

    // Update savings
    savings: state.savings + (effect.savings ?? 0),

    // Update budget
    budget: {
      ...state.budget,
      ...effect.budget,
    },
  };
}

// CREATE A FUNCTION THAT CHECKS WHETHER THE GAME IS OVER
// isGameOver is true if money is less than or equal to 0
export function isGameOver(state: PlayerState): boolean {
  return state.money <= 0;
}

// CREATE A FUNCTION THAT CHECKS WHETHER THE PLAYER HAS WON
/*
isGameWon is true if:
- Player's currentLevel == 10
AND
- Savings + Money is equal to or more than #10,000
*/

// NOTE: To plan for scalability, instead of directly checking that the player is on Level 10, use a constant that holds the total number of levels and compare the player's current level with the total levels

// Create functions that determine whether the player wins or survives the game.
export function isGameWon(state: PlayerState, totalLevels): boolean {
  const totalWealth = state.money;
  return state.currentLevel >= totalLevels && totalWealth >= 10000;
}

export function isGameSurvived(state: PlayerState, totalLevels): boolean {
  const totalWealth = state.money;
  const totalSavings = state.savings;
  return (
    state.currentLevel >= totalLevels &&
    0 < totalWealth &&
    totalWealth <= 10000 &&
    totalSavings != 0
  );
}

// CREATE A FUNCTION THAT MOVES THE PLAYER TO THE NEXT DECISION WITHIN A LEVEL
export function nextDecision(state: PlayerState): PlayerState {
  return {
    ...state,
    decisionIndex: state.decisionIndex + 1,
  };
}

// CREATE A FUNCTION THAT MOVES THE PLAYER TO THE NEXT LEVEL
export function nextLevel(state: PlayerState): PlayerState {
  return {
    ...state,
    currentLevel: state.currentLevel + 1,
    decisionIndex: 0,
  };
}

// SAVE GAME STATE TO BROWSER LOCAL STORAGE
export function saveGame(state: PlayerState): void {
  localStorage.setItem('wiseup-game-state', JSON.stringify(state));
}

// LOAD GAME FROM BROWSER STORAGE TO RESTORE PLAYER PROGRESS
export function loadGame(): PlayerState {
  const saved = localStorage.getItem('wiseup-game-state');
  if (saved) {
    return JSON.parse(saved);
  }

  return {
    money: 50000,
    savings: 0,
    currentLevel: 1,
    decisionIndex: 0,
  };
}
