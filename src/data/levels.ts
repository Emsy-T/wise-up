import type { Level } from '../types/game';

export const levels: Level[] = [
  // LEVEL 1 - Create a budget
  {
    id: 1,
    title: 'Plan Your Month',
    description:
      'You just received ₦50,000. Before spending anything, you have to plan your budget for the month.',
    challenge: 'Create a balanced budget for your needs and lifestyle',
    decisions: [
      // FOOD BUDGET
      {
        id: 'food-budget',
        prompt: 'How much will you spend on food?',
        choices: [
          {
            id: 'food-low',
            text: '₦10,000',
            effect: { budget: { food: 10000 } },
          },
          {
            id: 'food-medium',
            text: '₦15,000',
            effect: { budget: { food: 15000 } },
          },
          {
            id: 'food-high',
            text: '₦20,000',
            effect: { budget: { food: 20000 } },
          },
        ],
      },

      // TRANSPORT BUDGET
      {
        id: 'transport-budget',
        prompt: 'How much will you spend on transport?',
        choices: [
          {
            id: 'transport-low',
            text: '₦5,000',
            effect: { budget: { transport: 5000 } },
          },
          {
            id: 'transport-medium',
            text: '₦10,000',
            effect: { budget: { transport: 10000 } },
          },
          {
            id: 'transport-high',
            text: '₦15,000',
            effect: { budget: { transport: 15000 } },
          },
        ],
      },

      // SOCIALS BUDGET
      {
        id: 'social-budget',
        prompt: 'How much will you spend on your social life and extras?',
        choices: [
          {
            id: 'social-low',
            text: '₦5,000',
            effect: { budget: { social: 5000 } },
          },
          {
            id: 'social-medium',
            text: '₦10,000',
            effect: { budget: { social: 10000 } },
          },
          {
            id: 'social-high',
            text: '₦15,000',
            effect: { budget: { social: 15000 } },
          },
        ],
      },

      // AIRTIME/DATA BUDGET
      {
        id: 'airtime/data-budget',
        prompt:
          "How much will you spend on airtime and data? It's an essential too, you know.",
        choices: [
          {
            id: 'social-low',
            text: '₦5,000',
            effect: { budget: { airtime_data: 5000 } },
          },
          {
            id: 'social-medium',
            text: '₦10,000',
            effect: { budget: { airtime_data: 10000 } },
          },
          {
            id: 'social-high',
            text: '₦15,000',
            effect: { budget: { airtime_data: 15000 } },
          },
        ],
      },
    ],
  },
];
