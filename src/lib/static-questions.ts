
export interface StaticQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

export const STATIC_HERITAGE_QUESTIONS: StaticQuestion[] = [
  {
    question: "What is the capital of the United States?",
    options: ["New York City", "Los Angeles", "Washington, D.C.", "Chicago"],
    correctAnswer: "Washington, D.C.",
    explanation: "Washington, D.C. was founded on July 16, 1790, and serves as the seat of the U.S. government.",
    category: "Geography"
  },
  {
    question: "How many stars are on the U.S. flag?",
    options: ["13", "25", "50", "100"],
    correctAnswer: "50",
    explanation: "Each star represents one of the 50 states in the Union.",
    category: "Heritage"
  },
  {
    question: "Who was the first President of the United States?",
    options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
    correctAnswer: "George Washington",
    explanation: "George Washington served as the first president from 1789 to 1797.",
    category: "History"
  },
  {
    question: "Which document begins with 'We the People'?",
    options: ["Declaration of Independence", "Bill of Rights", "Constitution of the United States", "Emancipation Proclamation"],
    correctAnswer: "Constitution of the United States",
    explanation: "The Preamble to the Constitution establishes that the power of the government comes from the citizens.",
    category: "Law"
  },
  {
    question: "What is the national bird of the United States?",
    options: ["Hawk", "Eagle", "Bald Eagle", "Falcon"],
    correctAnswer: "Bald Eagle",
    explanation: "The Bald Eagle was chosen in 1782 for its long life, great strength, and majestic looks.",
    category: "Culture"
  },
  {
    question: "Which famous statue was a gift from France?",
    options: ["Lincoln Memorial", "Statue of Liberty", "Washington Monument", "Mount Rushmore"],
    correctAnswer: "Statue of Liberty",
    explanation: "Dedicated in 1886, it commemorates the centennial of the Declaration of Independence.",
    category: "Monuments"
  },
  {
    question: "Which state is known as the 'Aloha State'?",
    options: ["California", "Florida", "Hawaii", "Alaska"],
    correctAnswer: "Hawaii",
    explanation: "Hawaii is the only U.S. state located outside North America and is an archipelago.",
    category: "Geography"
  },
  {
    question: "Who wrote the Declaration of Independence?",
    options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "James Madison"],
    correctAnswer: "Thomas Jefferson",
    explanation: "Jefferson was the principal author of the document adopted on July 4, 1776.",
    category: "History"
  },
  {
    question: "Which U.S. holiday is celebrated on July 4th?",
    options: ["Thanksgiving", "Memorial Day", "Independence Day", "Veterans Day"],
    correctAnswer: "Independence Day",
    explanation: "July 4th commemorates the adoption of the Declaration of Independence in 1776.",
    category: "Culture"
  },
  {
    question: "Which monument features the faces of four U.S. presidents?",
    options: ["Statue of Liberty", "Mount Rushmore", "Lincoln Memorial", "Golden Gate Bridge"],
    correctAnswer: "Mount Rushmore",
    explanation: "It features George Washington, Thomas Jefferson, Theodore Roosevelt, and Abraham Lincoln.",
    category: "Monuments"
  },
  {
    question: "Which U.S. state was the first to join the Union?",
    options: ["Virginia", "Pennsylvania", "Delaware", "New York"],
    correctAnswer: "Delaware",
    explanation: "Delaware ratified the Constitution on December 7, 1787, becoming the first state.",
    category: "History"
  },
  {
    question: "Which ocean lies on the east coast of the United States?",
    options: ["Pacific Ocean", "Indian Ocean", "Arctic Ocean", "Atlantic Ocean"],
    correctAnswer: "Atlantic Ocean",
    explanation: "The Atlantic Ocean borders the Eastern Seaboard from Maine to Florida.",
    category: "Geography"
  },
  {
    question: "What is the largest national park in the United States?",
    options: ["Yellowstone", "Grand Canyon", "Denali", "Wrangell–St. Elias"],
    correctAnswer: "Wrangell–St. Elias",
    explanation: "Located in Alaska, it covers over 13 million acres.",
    category: "Geography"
  },
  {
    question: "Which American brothers are famous for inventing and flying the first successful airplane?",
    options: ["Wright Brothers", "Kennedy Brothers", "Rockefeller Brothers", "Edison Brothers"],
    correctAnswer: "Wright Brothers",
    explanation: "Orville and Wilbur Wright made the first controlled flight in 1903 at Kitty Hawk.",
    category: "Innovation"
  },
  {
    question: "Which U.S. president is featured on the one-dollar bill?",
    options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "Theodore Roosevelt"],
    correctAnswer: "George Washington",
    explanation: "As the first president, Washington has been on the $1 bill since 1869.",
    category: "History"
  }
];
