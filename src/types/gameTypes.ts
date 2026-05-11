// DEFINE PLAYER'S STATE. INCLUDE MONEY AVAILABLE, SAVINGS, CURRENT LEVEL, AND THE DECISION THEY ARE ON IN THE LEVEL
export type PlayerState = {
  money: number;
  savings: number;
  currentLevel: number;
  decisionIndex: number;
  budget?: {
    food?: number;
    transport?: number;
    social?: number;
    toiletries?: number;
  };
};

// DEFINE EFFECT, WHICH AFFECTS THE MONEY THE PLAYER HAS
export type Effect = {
  money?: number; // money added or lost
  savings?: number; //money moved to Savings
  budget?: {
    food?: number;
    transport?: number;
    social?: number;
    toiletries?: number;
  };
};

// DEFINE CHOICE, WHICH IS THE OPTIONS AVAILABLE FOR A DECISION
export type Choice = {
  id: string;
  text: string;
  effect: Effect;
};

// DEFINE DECISION, WHICH ALLOWS THE PLAYER TO MAKE A CHOICE THAT WILL HELP THEM COMPLETE THE CHALLENGE
export type Decision = {
  id: string;
  prompt: string;
  choices: Choice[];
};

// DEFINE LEVEL, WHICH IS A COLLECTION OF DECISIONS CONNECTED TO A CHALLENGE
export type Level = {
  id: number;
  title: string;
  description: string;
  challenge?: string;
  decisions: Decision[];
};

// DEFINE LEVEL RESULT, WHICH EVALUATES THE CONSEQUENCES OF THE PLAYER'S DECISIONS AND WHETHER THEY SUCCEEDED IN THE CHALLENGE
export type LevelResult = {
  moneyChange: number;
  savingsChange: number;
  success?: boolean; // checks whether or not the player completed the challenge
};
