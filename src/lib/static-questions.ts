
export interface StaticQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
  level?: number;
}

export const STATIC_HERITAGE_QUESTIONS: StaticQuestion[] = [
  // Original / Level 1-3 Pool
  {
    question: "What is the capital of the United States?",
    options: ["New York City", "Los Angeles", "Washington, D.C.", "Chicago"],
    correctAnswer: "Washington, D.C.",
    explanation: "Washington, D.C. was founded on July 16, 1790, and serves as the seat of the U.S. government.",
    category: "Geography",
    level: 1
  },
  {
    question: "How many stars are on the U.S. flag?",
    options: ["13", "25", "50", "100"],
    correctAnswer: "50",
    explanation: "Each star represents one of the 50 states in the Union.",
    category: "Heritage",
    level: 1
  },
  {
    question: "Who was the first President of the United States?",
    options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
    correctAnswer: "George Washington",
    explanation: "George Washington served as the first president from 1789 to 1797.",
    category: "History",
    level: 1
  },
  {
    question: "In what year was the Declaration of Independence signed?",
    options: ["1776", "1783", "1770", "1800"],
    correctAnswer: "1776",
    explanation: "The Continental Congress adopted the Declaration of Independence on July 4, 1776.",
    category: "History",
    level: 3
  },
  {
    question: "Who wrote most of the Declaration of Independence?",
    options: ["Washington", "Jefferson", "Franklin", "Madison"],
    correctAnswer: "Jefferson",
    explanation: "Thomas Jefferson was the primary author of the Declaration.",
    category: "History",
    level: 3
  },
  {
    question: "What document begins with 'We the People'?",
    options: ["Bill of Rights", "Constitution", "Declaration", "Articles of Confederation"],
    correctAnswer: "Constitution",
    explanation: "The Preamble to the U.S. Constitution begins with these famous words.",
    category: "Law",
    level: 3
  },
  {
    question: "How many original colonies were there?",
    options: ["10", "12", "13", "15"],
    correctAnswer: "13",
    explanation: "There were 13 original British colonies that declared independence.",
    category: "History",
    level: 3
  },
  {
    question: "Which city was the first U.S. capital?",
    options: ["New York City", "Boston", "Philadelphia", "Baltimore"],
    correctAnswer: "New York City",
    explanation: "New York City served as the first capital under the Constitution.",
    category: "History",
    level: 3
  },
  {
    question: "Who is known as the Father of the Constitution?",
    options: ["Washington", "Madison", "Jefferson", "Adams"],
    correctAnswer: "Madison",
    explanation: "James Madison's pivotal role at the convention earned him this title.",
    category: "Law",
    level: 3
  },
  {
    question: "Which famous ride warned that the British were coming?",
    options: ["Samuel Adams", "Paul Revere", "Jefferson", "Franklin"],
    correctAnswer: "Paul Revere",
    explanation: "Revere's midnight ride in 1775 warned the colonial militia.",
    category: "History",
    level: 3
  },

  // Level 4: Constitution & Government
  {
    question: "How many branches are in the U.S. government?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
    explanation: "The three branches are Legislative, Executive, and Judicial.",
    category: "Law",
    level: 4
  },
  {
    question: "Which branch makes laws?",
    options: ["Executive", "Judicial", "Legislative", "Cabinet"],
    correctAnswer: "Legislative",
    explanation: "Congress is the legislative branch responsible for making laws.",
    category: "Law",
    level: 4
  },
  {
    question: "Who signs bills into law?",
    options: ["Chief Justice", "President", "Speaker", "Governor"],
    correctAnswer: "President",
    explanation: "The President has the power to sign or veto bills passed by Congress.",
    category: "Law",
    level: 4
  },
  {
    question: "How many U.S. Senators are there?",
    options: ["50", "100", "435", "200"],
    correctAnswer: "100",
    explanation: "Each of the 50 states is represented by two Senators.",
    category: "Law",
    level: 4
  },
  {
    question: "How long is a President's term?",
    options: ["2 years", "4 years", "6 years", "8 years"],
    correctAnswer: "4 years",
    explanation: "A President is elected to a four-year term.",
    category: "Law",
    level: 4
  },

  // Level 5: Presidents
  {
    question: "Which President freed enslaved people during the Civil War?",
    options: ["Washington", "Lincoln", "Roosevelt", "Wilson"],
    correctAnswer: "Lincoln",
    explanation: "Abraham Lincoln issued the Emancipation Proclamation in 1863.",
    category: "Presidents",
    level: 5
  },
  {
    question: "Which President appears on the penny?",
    options: ["Jefferson", "Lincoln", "Washington", "Grant"],
    correctAnswer: "Lincoln",
    explanation: "Abraham Lincoln has been on the penny since 1909.",
    category: "Presidents",
    level: 5
  },
  {
    question: "Which President served four terms?",
    options: ["Lincoln", "F.D. Roosevelt", "Truman", "Kennedy"],
    correctAnswer: "F.D. Roosevelt",
    explanation: "Franklin D. Roosevelt is the only president to serve more than two terms.",
    category: "Presidents",
    level: 5
  },
  {
    question: "Which President purchased Louisiana from France?",
    options: ["Washington", "Jefferson", "Adams", "Monroe"],
    correctAnswer: "Jefferson",
    explanation: "Thomas Jefferson oversaw the Louisiana Purchase in 1803.",
    category: "Presidents",
    level: 5
  },

  // Level 6: Civil War & Expansion
  {
    question: "Civil War began in:",
    options: ["1861", "1850", "1865", "1870"],
    correctAnswer: "1861",
    explanation: "The American Civil War began with the shelling of Fort Sumter.",
    category: "History",
    level: 6
  },
  {
    question: "Which side was the Union?",
    options: ["North", "South", "West", "East"],
    correctAnswer: "North",
    explanation: "The Union represented the northern states during the Civil War.",
    category: "History",
    level: 6
  },
  {
    question: "The Louisiana Purchase doubled the size of:",
    options: ["France", "U.S.", "Mexico", "Canada"],
    correctAnswer: "U.S.",
    explanation: "The purchase added approximately 827,000 square miles to the U.S.",
    category: "History",
    level: 6
  },

  // Level 7: National Parks & Nature
  {
    question: "First U.S. National Park?",
    options: ["Yosemite", "Yellowstone", "Zion", "Glacier"],
    correctAnswer: "Yellowstone",
    explanation: "Yellowstone was established as the first national park in 1872.",
    category: "Geography",
    level: 7
  },
  {
    question: "Grand Canyon is in:",
    options: ["Arizona", "Utah", "Nevada", "New Mexico"],
    correctAnswer: "Arizona",
    explanation: "The Grand Canyon is one of the world's most famous natural wonders.",
    category: "Geography",
    level: 7
  },

  // Level 8: World Wars & Space Race
  {
    question: "First person on the Moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
    correctAnswer: "Neil Armstrong",
    explanation: "Neil Armstrong took the first steps on the moon in 1969.",
    category: "Innovation",
    level: 8
  },
  {
    question: "NASA was founded in:",
    options: ["1958", "1945", "1965", "1970"],
    correctAnswer: "1958",
    explanation: "NASA was established during the Space Race with the Soviet Union.",
    category: "Innovation",
    level: 8
  },

  // Level 9: Modern America
  {
    question: "9/11 occurred in:",
    options: ["1999", "2001", "2005", "2010"],
    correctAnswer: "2001",
    explanation: "The September 11 terrorist attacks happened in 2001.",
    category: "History",
    level: 9
  },
  {
    question: "Silicon Valley is known for:",
    options: ["Farming", "Technology", "Mining", "Tourism"],
    correctAnswer: "Technology",
    explanation: "Silicon Valley is the global center for high technology and innovation.",
    category: "Innovation",
    level: 9
  },

  // Level 10: Expert Heritage Challenge
  {
    question: "Federalist Papers supported:",
    options: ["Constitution ratification", "Independence", "Civil War", "Expansion"],
    correctAnswer: "Constitution ratification",
    explanation: "The papers were written to promote the ratification of the U.S. Constitution.",
    category: "History",
    level: 10
  },
  {
    question: "Marbury v. Madison established:",
    options: ["Voting rights", "Judicial review", "Free speech", "Federal taxes"],
    correctAnswer: "Judicial review",
    explanation: "This landmark case established the Supreme Court's power to strike down laws.",
    category: "Law",
    level: 10
  }
];
