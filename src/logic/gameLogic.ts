import type { PlayerState, Choice } from '../types/gameTypes';

type totalLevels = number;
const totalLevels = 10;

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

// NOTE: To plan for scalability, instead of directly checking that the player is on Level 10, use a constant that holds the total number of levels and compare the player's current level with the total levels

// Create functions that determine whether the player wins or survives the game.
export function evaluateGame(state: PlayerState): 'win' | 'survived' {
  const totalMoney = state.money;

  if (state.currentLevel >= totalLevels && totalMoney >= 10000) return 'win';
  if (state.currentLevel >= totalLevels && totalMoney > 0 && totalMoney < 10000)
    return 'survived';

  return 'win';
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
  const nextLevel = state.currentLevel + 1;

  // Pay salary every 5 levels
  const updatedState = paySalary(nextLevel, state);

  return {
    ...updatedState,
    currentLevel: nextLevel,
    decisionIndex: 0,
  };
}

// CREATE A FUNCTION THAT PAYS THE PLAYER THEIR SALARY EVERY FIVE LEVELS
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
    money: 100000,
    savings: 0,
    currentLevel: 1,
    decisionIndex: 0,
    budget: {},
  };
}
