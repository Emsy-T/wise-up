// levels.ts

import type { Level } from '../types/gameTypes';

export const levels: Level[] = [
  // LEVEL 1 - Create a budget
  {
    id: 1,
    title: 'Budgeting Basics',
    description:
      'You have ₦100,000. Before spending anything, you have to create your budget for the month.',
    challenge: 'Create a balanced budget for your needs and lifestyle.',
    decisions: [
      // Decision 1: FOOD BUDGET
      {
        id: 'food-budget',
        prompt: 'How much will you spend on food this month?',
        choices: [
          {
            id: 'essentials',
            text: '₦30,000 - bare minimum (rice, beans, bread, eggs, milk, etc)',
            effect: { budget: { food: 30000 } },
          },
          {
            id: 'balanced',
            text: '₦50,000 - essentials + meat + fruits + vegetables',
            effect: { budget: { food: 50000 } },
          },
          {
            id: 'premium',
            text: '₦80,000 - balanced + snacks + soft drinks + eating out occasionally',
            effect: { budget: { food: 80000 } },
          },
        ],
      },

      // Decision 2: TRANSPORT BUDGET
      {
        id: 'transport-budget',
        prompt: 'How will you get around?',
        choices: [
          {
            id: 'bus',
            text: 'Public transport (₦10,000)',
            effect: { budget: { transport: 10000 } },
          },
          {
            id: 'taxi',
            text: 'Occasional taxi rides (₦20,000)',
            effect: { budget: { transport: 20000 } },
          },
          {
            id: 'ride-hailing',
            text: 'Bolt for most trips (₦50,000)',
            effect: { budget: { transport: 50000 } },
          },
        ],
      },

      // Decision 3: SOCIALS BUDGET
      {
        id: 'social-budget',
        prompt: 'How much will you spend on your social life?',
        choices: [
          {
            id: 'low',
            text: 'Park visits, strolls, or hangouts with friends once a week (₦5,000)',
            effect: { budget: { social: 5000 } },
          },
          {
            id: 'moderate',
            text: 'Occasional concerts, dinners, and outings (₦20,000)',
            effect: { budget: { social: 20000 } },
          },
          {
            id: 'high',
            text: 'Parties and frequent events (₦50,000)',
            effect: { budget: { social: 50000 } },
          },
        ],
      },

      // Decision 4: TOILETRIES BUDGET
      {
        id: 'toiletries-budget',
        prompt: 'How much will you spend on your personal care & hygiene?',
        choices: [
          {
            id: 'basic',
            text: '₦5,000 — Soap, toothpaste, tissue, deodorant',
            effect: { budget: { toiletries: 5000 } },
          },
          {
            id: 'standard',
            text: '₦7,000 — Soap, toothpaste, tissue, deodorant, body cream',
            effect: { budget: { toiletries: 7000 } },
          },
          {
            id: 'high-end',
            text: '₦25,000 — Basic toiletries, skincare, perfume',
            effect: { budget: { toiletries: 25000 } },
          },
        ],
      },
    ],
  },

  // LEVEL 2: KEEP TO YOUR BUDGET
  {
    id: 2,
    title: 'Grocery & Essentials Shopping',
    challenge: 'Stick to your budget and DO NOT OVERSPEND',
    description:
      'You head to the supermarket with your monthly budget in mind. Can you resist temptations and stick to your plan?',
    decisions: [
      // Decision 1: Pick the grocery basket you are going with
      {
        id: 'food',
        prompt: 'Which grocery basket will you pick?',
        choices: [
          {
            id: 'basic-basket',
            text: 'Basic Basket (₦15,000) — Rice (1kg), beans (1kg), garri (1kg), bread, milk',
            effect: { money: -15000 },
          },
          {
            id: 'balanced-basket',
            text: 'Balanced Basket (₦30,000) — Basic + chicken, vegetables, fruits, cooking oil',
            effect: { money: -30000 },
          },
          {
            id: 'premium-basket',
            text: 'Basic Basket (₦50,000) — Balanced + beef, snacks, soft drinks, extra variety',
            effect: { money: -50000 },
          },
        ],
      },
      // Decision 2: Will you get your favourite snacks?
      {
        id: 'snacks-tempt',
        prompt: 'You see your favourite snacks. Do you buy them?',
        choices: [
          {
            id: 'buy-snacks',
            text: 'Yes (₦5,000)',
            effect: { money: -5000 },
          },
          {
            id: 'no-snacks',
            text: 'No',
            effect: {},
          },
        ],
      },
      // Decision 3: Get the toiletries you need
      {
        id: 'buy-toiletries',
        prompt:
          'You need to get soaps, tissues, detergent, toothpaste, body cream, deodorant, etc',
        choices: [
          {
            id: 'basic-toiletries',
            text: 'Soap + toothpaste + tissue + deodorant (₦5,000)',
            effect: { money: -5000 },
          },
          {
            id: 'standard-toiletries',
            text: 'Soap + toothpaste + tissue + deodorant + body cream (₦7,000)',
            effect: { money: -7000 },
          },
          {
            id: 'premium-toiletries',
            text: 'Basic toiletries + skincare + perfume (₦25,000)',
            effect: { money: -25000 },
          },
        ],
      },
      // Decision 4: Will you buy more items than you budgeted for?
      {
        id: 'extra-shopping',
        prompt:
          'You spot cool decorations and items that would make your place look a lot less boring and lifeless. Do you add them to your cart?',
        choices: [
          {
            id: 'yes-extra-shopping',
            text: 'Yes (₦10,000)',
            effect: { money: -10000 },
          },
          {
            id: 'no-extra-shopping',
            text: 'No',
            effect: { money: 0 },
          },
        ],
      },
      // Decision 5: Accept or decline the discount offer
      {
        id: 'bulk-discount',
        prompt: 'There’s a bulk discount on rice and oil. Do you take it?',
        choices: [
          {
            id: 'yes-bulk-discount',
            text: 'Yes (₦20,000) — Buy in bulk, save long‑term but spend more now',
            effect: { money: -20000 },
          },
          {
            id: 'no-bulk-discount',
            text: 'No',
            effect: { money: 0 },
          },
        ],
      },
      // Decision 6: It's checkout time. Can you stay disciplined till the end?
      {
        id: 'checkout',
        prompt:
          'You’re at the checkout counter. Do you add last‑minute extras?',
        choices: [
          {
            id: 'checkout-add',
            text: 'Yes (₦3,000) — Gum, sweets, etc',
            effect: { money: -3000 },
          },
          {
            id: 'checkout',
            text: 'No.',
            effect: { money: 0 },
          },
        ],
      },
    ],
  },

  // LEVEL 3 - EMERGENCY PHONE REPAIR
  {
    id: 3,
    title: 'Emergency Phone Repair',
    challenge:
      'Sometimes, situations that you do not plan for, like a phone in need of repair, come up suddenly. Use your discretion to handle this emergency.',
    description:
      "Your phone has been charging really slowly for over a week. You've changed the charging cable, but the issue has remained, so you decided to take it for a repair, but to make matters worse, it dropped from the top of the staircase, while you were going upstairs. Now, you have a really cracked screen and charging issues. This is urgent because you rely on your phone daily. How will you handle it?",
    decisions: [
      // Decision 1: Choose whether you will repair your phone or not
      {
        id: 'repair-choice',
        prompt: 'Your phone screen is severely damaged. What will you do? ',
        choices: [
          {
            id: 'full-repair',
            text: 'Full Repair (₦35,000) — Replace the screen and fix hardware issues',
            effect: { money: -35000 },
          },
          {
            id: 'partial-repair',
            text: 'Partial Repair (₦15,000) — Fix only the charging port or battery, keep using cracked screen',
            effect: { money: -15000 },
          },
          {
            id: 'postpone-repair',
            text: 'Postpone Repair (₦0) — Delay repairs, risk worsening damage',
            effect: { money: 0 },
          },
        ],
      },
    ],
  },

  // LEVEL 4: HANGOUT WITH FRIENDS
  {
    id: 4,
    title: 'Hangout With Friends',
    challenge: 'Spend time with your friends without breaking your budget',
    description:
      "It’s been months since you'd seen one another and your friends want to hang out. How will you spend time together without breaking your budget?",
    decisions: [
      //Decision 1: Choose how you will spend time with your friends
      {
        id: 'hangout-type',
        prompt: 'How will you hang out with your friends?',
        choices: [
          {
            id: 'home-hangout',
            text: 'Invite them to your place',
            effect: {},
            nextDecisionId: 'home-hangout-options',
          },
          {
            id: 'park-visit',
            text: 'Spend the day at a park',
            effect: {},
            nextDecisionId: 'park-visit-options',
          },
          {
            id: 'event',
            text: 'Attend an event',
            effect: {},
            nextDecisionId: 'event-options',
          },
        ],
      },
      // Decision 1.1: If you picked 'home-hangout' choice from Decision 1, choose what you will do at home
      {
        id: 'home-hangout-options',
        prompt: 'What will you do at home?',
        choices: [
          {
            id: 'casual-fun',
            text: 'Chat and play games',
            effect: { money: 0 },
          },
          {
            id: 'movie-night',
            text: 'Renew your Netflix subscription and watch a movie (₦4,000)',
            effect: { money: 4000 },
          },
        ],
      },
      // Decision 1.2: If you picked the 'park-visit' choice from Decision 1, you choose what activity you will do in the park
      {
        id: 'park-visit-options',
        prompt: 'What activity will you do at the park?',
        choices: [
          {
            id: 'picnic',
            text: 'Have a picnic (₦5,000)',
            effect: { money: 5000 },
          },
          {
            id: 'games',
            text: 'Go on some rides and play games (₦7,000)',
            effect: { money: 7000 },
          },
        ],
      },
      // Decision 1.3: If you picked 'event' choice from Decision 1, you choose the event you will be attending
      {
        id: 'event-options',
        prompt: 'What event will you be attending?',
        choices: [
          {
            id: 'house-party',
            text: 'Attend a house party (₦10,000)',
            effect: { money: 10000 },
          },
          {
            id: 'comedy-show',
            text: 'Attend a show featuring one of your favorite comedians (₦20,000)',
            effect: { money: 20000 },
          },
          {
            id: 'vip-party',
            text: 'Attend an exclusive party (₦50,000)',
            effect: { money: 50000 },
          },
        ],
      },
    ],
  },

  // LEVEL 5: IT'S THE WEEKEND
  {
    id: 5,
    title: "It's the Weekend!",
    challenge: 'Make the best of your weekend',
    description:
      'It’s the weekend! How will you spend your time? Will you go out and enjoy yourself, or stay home and recharge? Your choices will affect both your wallet and your wellbeing.',
    decisions: [
      // Decision 1: Choose your weekend plan
      {
        id: 'weekend-plans',
        prompt: 'What will you do this weekend?',
        choices: [
          {
            id: 'go-out',
            text: 'Spend time outside my house',
            effect: {},
            nextDecisionId: 'go-out-options',
          },
          {
            id: 'stay-home',
            text: 'Stay at home',
            effect: {},
            nextDecisionId: 'stay-home-options',
          },
        ],
      },
      // Decision 1.1: If you picked 'go-out', you choose where you will go
      {
        id: 'go-out-options',
        prompt: 'Where will you go?',
        choices: [
          {
            id: 'shopping',
            text: 'Shopping for clothes (₦40,000)',
            effect: { money: -40000 },
          },
          {
            id: 'weekend-with-friend',
            text: "Spend the day at a nearby friend's house",
            effect: {},
          },
        ],
      },
      // Decision 1.2: If you chose 'stay-home', you choose what you will do at home
      {
        id: 'stay-home-options',
        prompt: 'What will you do at home?',
        choices: [
          {
            id: 'youtube',
            text: 'Watch YouTube (₦2,000 for data)',
            effect: { money: -2000 },
          },
          {
            id: 'sleep',
            text: 'Sleep/Rest',
            effect: {},
          },
          {
            id: 'freelance',
            text: 'Finish a freelance job for a client and earn money (₦120,000)',
            effect: { money: +120000 },
          },
        ],
      },
    ],
  },

  // LEVEL 6 - PAY DAY
  {
    id: 6,
    title: 'PAY DAY',
    challenge: 'Plan how you are going to spend your money this month',
    description:
      'You’ve just received your monthly salary. How will you manage it? Will you stick to your budget, expand it, or revisit past expenses?',
    decisions: [
      // Decision 1: Revise your budget
      {
        id: 'revise-budget',
        prompt: 'You’ve received ₦300,000 salary. How will you spend it?',
        choices: [
          {
            id: 'maintain-budget',
            text: 'I will maintain my budget from last month',
            effect: {},
            nextDecisionId: 'phone-repair',
          },
          {
            id: 'increase-budget',
            text: 'I will increase my budget',
            effect: {},
            nextDecisionId: 'increase-food-budget',
          },
        ],
      },

      // THE FOLLOWING DECISIONS ARE AS A RESULT OF THE 'INCREASE-BUDGET' CHOICE
      // Decision 1.1: Increase food budget
      {
        id: 'increase-food-budget',
        prompt: 'Do you want to increase your food budget?',
        choices: [
          {
            id: 'food-extra',
            text: 'Add ₦20,000 for more variety (meat, fruits, snacks)',
            effect: { budget: { food: +20000 }, money: -20000 },
            nextDecisionId: 'increase-transport-budget', // chain continues
          },
          {
            id: 'no-food-extra',
            text: 'No change',
            effect: {},
            nextDecisionId: 'increase-transport-budget',
          },
        ],
      },

      // Decision 1.2: Increase transport budget
      {
        id: 'increase-transport-budget',
        prompt: 'Do you want to increase your transport budget?',
        choices: [
          {
            id: 'transport-extra',
            text: 'Add ₦20,000 for more taxi/ride-hailing trips',
            effect: { budget: { transport: +20000 }, money: -20000 },
            nextDecisionId: 'increase-social-budget',
          },
          {
            id: 'no-transport-extra',
            text: 'No change',
            effect: {},
            nextDecisionId: 'increase-social-budget',
          },
        ],
      },

      // Decision 1.3: Increase social budget
      {
        id: 'increase-social-budget',
        prompt: 'Do you want to increase your social budget?',
        choices: [
          {
            id: 'social-extra',
            text: 'Add ₦30,000 for more outings and events',
            effect: { budget: { social: +30000 }, money: -30000 },
            nextDecisionId: 'increase-toiletries-budget',
          },
          {
            id: 'no-social-extra',
            text: 'No change',
            effect: {},
            nextDecisionId: 'increase-toiletries-budget',
          },
        ],
      },

      // Decision 1.4: Increase toiletries budget
      {
        id: 'increase-toiletries-budget',
        prompt: 'Do you want to increase your toiletries budget?',
        choices: [
          {
            id: 'toiletries-extra',
            text: 'Add ₦5,000 for premium toiletries and skincare',
            effect: { budget: { toiletries: +5000 }, money: -5000 },
            nextDecisionId: 'phone-repair', // after finishing upgrades, go to phone repair
          },
          {
            id: 'no-toiletries-extra',
            text: 'No change',
            effect: {},
            nextDecisionId: 'phone-repair',
          },
        ],
      },

      // Decision 2: Choose to repair your phone based on the choice made in Level 3 Decision 1
      {
        id: 'phone-repair',
        prompt: 'Your phone is still damaged. Do you want to repair it now?',
        choices: [
          // If player chooses yes, there will be a conditional that determines how much money will be deducted based on whether the player had done partial repair before now or no repair at all
          {
            id: 'yes-repair',
            text: 'Yes',
            effect: {},
          },
          {
            id: 'no-repair',
            text: 'No',
            effect: {},
          },
        ],
      },
      // Decision 3: Choose whether you want to save money or not
      {
        id: 'savings',
        prompt: 'Do you want to put some of your salary into savings?',
        choices: [
          {
            id: 'save-10k',
            text: 'Yes, I will save ₦10,000',
            effect: { savings: +10000, money: -10000 },
          },
          {
            id: 'save-20k',
            text: 'Yes, I will save ₦20,000',
            effect: { savings: +20000, money: -20000 },
          },
          {
            id: 'no-savings',
            text: "No, I don't want to save money",
            effect: {},
          },
        ],
      },
    ],
  },

  // LEVEL 7 - INVESTMENT OPPORTUNITY
  {
    id: 7,
    title: 'Investment Opportunity',
    challenge: 'Choose the right opportunity to invest in',
    description:
      'Investing is a great way to build long-term wealth, but beware of scams and frauds. You are presented with two investment opportunities. One is legit and the other is a scam. Can you spot the real deal?',
    decisions: [
      // Decision 1: Choose the opportunity to invest in
      {
        id: 'investment-options',
        prompt: 'Choose the opportunity you would like to invest in',
        choices: [
          {
            id: 'fixed-deposit',
            text: 'Your bank offers a fixed deposit account. You’ll lock in your money for 3 months and earn 8% interest. The bank is well‑known, but the returns feel small compared to other options.',
            effect: {},
          },
          {
            id: 'import-deal',
            text: 'A close friend of yours says he’s importing phones and accessories from Dubai. He promises to give you 20% of the profit every month if you invest. He shows you pictures of the goods and receipts, and tells you that he has been using his personal account for business transactions since he is just starting out.',
            effect: {},
          },
        ],
      },
      // Decision 2: Choose the amount of money you will invest
      {
        id: 'invest-money',
        prompt: 'How much will you invest?',
        choices: [
          {
            id: 'invest-10k',
            text: '₦10,000',
            effect: { money: -10000 },
          },
          {
            id: 'invest-30k',
            text: '₦30,000',
            effect: { money: -30000 },
          },
          {
            id: 'invest-50k',
            text: '₦50,000',
            effect: { money: -50000 },
          },
        ],
      },
    ],
  },

  // LEVEL 8 - Business Trip
  {
    id: 8,
    title: 'Business Trip',
    challenge:
      'Do not spend more than ₦50,000 of YOUR money on your three-day business trip',
    description:
      "You've been asked to travel for a business opportunity. Your company has made some provisions — they'll cover part of your transport and accommodation, but you’ll still need to decide how to manage the trip wisely.",
    decisions: [
      // Decision 1: Choose your mode of transport
      {
        id: 'travel-transport',
        prompt:
          'Your company will cover ₦20,000 for transport. How will you travel?',
        choices: [
          {
            id: 'public-transport',
            text: 'Take public transport (₦20,000)',
            effect: { money: 0 },
          },
          {
            id: 'flight',
            text: 'Travel by plane (₦50,000)',
            effect: { money: -30000 },
          },
        ],
      },
      // Decision 2: Choose where you will stay during the trip
      {
        id: 'travel-accommodation',
        prompt:
          'Your company provides ₦80,000 for accommodation. Where will you stay?',
        choices: [
          {
            id: 'budget-hotel',
            text: 'Stay in a hotel that comes with the basic room setup (₦15,000/night)',
            effect: { money: 0 },
          },
          {
            id: 'mid-hotel',
            text: 'Stay in a hotel that comes with a bigger room + free WiFi (₦30,000/night)',
            effect: { money: -10000 },
          },
          {
            id: 'luxury-hotel',
            text: 'Stay in a hotel that comes with a bigger room + free WiFi + free breakfast (₦50,000/night)',
            effect: { money: -70000 },
          },
        ],
      },
      // Decision 3: Choose your meal budget
      {
        id: 'travel-meals',
        prompt:
          'Your company gives you a ₦10,000 meal allowance. How will you spend it?',
        choices: [
          {
            id: 'maintain-allowance',
            text: 'Eat within the budget',
            effect: { money: 0 },
          },
          {
            id: 'extra-meals',
            text: 'Increase your spending to include more food and snacks (₦5,000)',
            effect: { money: -10000 },
          },
        ],
      },
    ],
  },

  // LEVEL 9 - LIFESTYLE UPGRADE
  {
    id: 9,
    title: 'Lifestyle Upgrade',
    challenge:
      'Feel free to upgrade your lifestyle however you like, but DO NOT SPEND ALL YOUR MONEY!',
    description:
      "You feel it's about time you upgrade your lifestyle. New clothes, gadgets, or even a better place to live are tempting. Will you indulge or stay disciplined?",
    decisions: [
      // Decision 1: Wardrobe upgrade
      {
        id: 'wardrobe-upgrade',
        prompt: 'Do you want to upgrade your wardrobe?',
        choices: [
          {
            id: 'basic-wardrobe',
            text: "Yes, I'll get a lot of clothes that I can style in different ways to upgrade my look (₦100,000)",
            effect: { money: -100000 },
          },
          {
            id: 'designer-wardrobe',
            text: "Yes, I'll get some branded clothes to upgrade my look (₦400,000)",
            effect: { money: -400000 },
          },
          {
            id: 'no-clothes',
            text: 'Maybe later',
            effect: {},
          },
        ],
      },
      // Decision 2: Phone Upgrade
      {
        id: 'phone-upgrade',
        prompt: 'Do you want to upgrade your phone?',
        choices: [
          {
            id: 'affordable-phone',
            text: 'Yes, I will get a good Android phone (₦200,000)',
            effect: { money: -150000 },
          },
          {
            id: 'expensive-phone',
            text: 'Latest iPhone (₦1,200,000)',
            effect: { money: -1200000 },
          },
          {
            id: 'no-phone',
            text: 'No upgrade. I like my current phone.',
            effect: {},
          },
        ],
      },
      // Decision 3: Extra lifestyle upgrade
      {
        id: 'lifestyle-extras',
        prompt: 'Do you want to add extra things to your lifestyle?',
        choices: [
          {
            id: 'gym-membership',
            text: 'Get a gym membership (₦20,000/month)',
            effect: { money: -20000 },
          },
          {
            id: 'streaming-services',
            text: 'Subscribe to Spotify Premium, Prime Video, and YouTube Premium (₦5,000/month)',
            effect: { money: -5000 },
          },
          {
            id: 'no-lifestyle-extra',
            text: "No, I'm good",
            effect: {},
          },
        ],
      },
    ],
  },

  // LEVEL 10 - BIRTHDAY CELEBRATION
  {
    id: 10,
    title: 'Birthday Celebration',
    challenge: '',
    description:
      'It’s your birthday! You want to celebrate, but you have to decide how big should the party should be? Will you keep it simple, celebrate with colleagues, or go all out with a grand bash?',
    decisions: [
      // Decision 1: Choose the type of birthday party
      {
        id: 'birthday-type',
        prompt: 'How will you celebrate your birthday?',
        choices: [
          {
            id: 'small-birthday',
            text: 'Invite close friends and family to my home and have food, drinks, and cake (₦30,000)',
            effect: { money: -30000 },
          },
          {
            id: 'mid-birthday',
            text: 'Celebrate with colleagues at work. Include catering, drinks, and decorations (₦60,000)',
            effect: { money: -60000 },
          },
          {
            id: 'grand-birthday',
            text: 'Throw a huge birthday party. Rent a hall and hire event planners (₦250,000)',
            effect: { money: -250000 },
          },
        ],
      },
      // Decision 2: Choose the type of entertainment that will be provided at the party
      {
        id: 'entertainment-type',
        prompt: 'What kind of entertainment will you provide?',
        choices: [
          {
            id: 'dj',
            text: 'Hire a DJ (₦50,000)',
            effect: { money: -50000 },
          },
          {
            id: 'live-performance',
            text: 'Invite a band to give a live performance (₦100,000)',
            effect: { money: -100000 },
          },
          {
            id: 'no-entertainment',
            text: 'No entertainment',
            effect: {},
          },
        ],
      },
      // Decision 3: Choose the type of cake
      {
        id: 'birthday-cake',
        prompt: 'What kind of cake will you buy?',
        choices: [
          {
            id: 'small-cake',
            text: 'Invite close friends and family to my home and have food, drinks, and cake (₦30,000)',
            effect: { money: -30000 },
          },
          {
            id: 'medium-cake',
            text: 'Celebrate with colleagues at work. Include catering, drinks, and decorations (₦60,000)',
            effect: { money: -60000 },
          },
          {
            id: 'large-cake',
            text: 'Throw a huge birthday party. Rent a hall and hire event planners (₦250,000)',
            effect: { money: -250000 },
          },
        ],
      },
      // Decision 4: What extra activities or items will you add to your birthday?
      {
        id: 'birthday-extras',
        prompt: 'Do you want to add any of the following to your celebration?',
        choices: [
          {
            id: 'souvenirs',
            text: 'Include gifts for guests (₦20,000)',
            effect: { money: -20000 },
          },
          {
            id: 'photographer',
            text: 'Hire a photographer to capture memories (₦30,000)',
            effect: { money: -30000 },
          },
          {
            id: 'no-extras',
            text: "No, I'm sticking to my original plan",
            effect: {},
          },
        ],
      },
    ],
  },
];
