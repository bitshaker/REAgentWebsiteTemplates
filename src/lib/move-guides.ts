export const guides = {
  buyers: {
    intro:
      'A home has to work for the way you live. Start with a plan for what to look for, how to compare it, and when you feel ready to decide.',
    action: 'Talk through your search',
    heading: 'From first questions to keys',
    spotlight: {
      label: 'Take this on a tour',
      title: 'Imagine an ordinary Tuesday.',
      notes: [
        'Follow your route from the front door to the kitchen.',
        'Notice where coats, shoes, and everyday items would go.',
        'Write down one thing to ask about before a second visit.',
      ],
    },
    steps: [
      {
        title: 'Set your priorities',
        text: 'Talk through timing, budget conversations, and what needs to work on an ordinary day. Sort your list into essentials and nice-to-haves.',
      },
      {
        title: 'Tour with a purpose',
        text: 'Compare homes against your priorities. Note how rooms connect, which questions need answers, and what you might want a professional to inspect.',
      },
      {
        title: 'Understand the decision',
        text: 'Before making an offer, review the terms and tradeoffs. If you move forward, work through due diligence and closing one step at a time.',
      },
    ],
    questions: [
      {
        question: 'What should I bring to a first conversation?',
        answer:
          'A rough timeline, the places you are considering, and two or three things you want your next home to do better. It is fine if some answers are still open.',
      },
      {
        question: 'What if I am just starting to look?',
        answer:
          'Start with a conversation about what you want to learn. A short list of priorities can make browsing and early tours more useful.',
      },
    ],
  },
  sellers: {
    intro:
      'Decide what is worth doing before you list, how to present the home, and which terms matter most when it is time to compare offers.',
    action: 'Plan a first walkthrough',
    heading: 'From preparation to closing',
    spotlight: {
      label: 'Before the first walkthrough',
      title: 'Start with three useful notes.',
      notes: [
        'Write down the dates that matter to your move.',
        'Gather information about recent repairs or improvements.',
        'Flag any prep tasks you are unsure are worth doing.',
      ],
    },
    steps: [
      {
        title: 'Start with a walkthrough',
        text: 'Discuss your timing, property condition, and current comparable sales. Work out what needs attention and what can stay as it is.',
      },
      {
        title: 'Plan the presentation',
        text: 'Agree on photography, property details, showing logistics, and how to describe the home accurately. Give each task an owner and a deadline.',
      },
      {
        title: 'Compare the whole offer',
        text: 'Review price alongside timing, contingencies, and other terms. Coordinate next steps and stay informed as the details come together.',
      },
    ],
    questions: [
      {
        question: 'Do I need to renovate before I sell?',
        answer:
          'Start with a walkthrough. The right priorities depend on the home, your timeline, and the tradeoffs between cost and effort.',
      },
      {
        question: 'Can we talk before I choose a list date?',
        answer:
          'Yes. An early conversation can help you work backward from a possible move and decide what to do first.',
      },
    ],
  },
} as const;
