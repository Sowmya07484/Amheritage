
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
  },
  {
    question: "Which amendment gave women the right to vote?",
    options: ["15th Amendment", "19th Amendment", "21st Amendment", "26th Amendment"],
    correctAnswer: "19th Amendment",
    explanation: "The 19th Amendment was ratified in 1920, guaranteeing women the right to vote.",
    category: "Law"
  },
  {
    question: "What is the largest state by land area?",
    options: ["Texas", "California", "Alaska", "Montana"],
    correctAnswer: "Alaska",
    explanation: "Alaska is more than twice the size of Texas, the second largest state.",
    category: "Geography"
  },
  {
    question: "Who was the primary author of the U.S. Constitution?",
    options: ["James Madison", "Thomas Jefferson", "Alexander Hamilton", "John Jay"],
    correctAnswer: "James Madison",
    explanation: "James Madison is known as the 'Father of the Constitution'.",
    category: "History"
  },
  {
    question: "In what city was the Declaration of Independence signed?",
    options: ["Boston", "New York City", "Philadelphia", "Washington, D.C."],
    correctAnswer: "Philadelphia",
    explanation: "The document was signed at Independence Hall in Philadelphia.",
    category: "History"
  },
  {
    question: "What is the name of the national anthem?",
    options: ["America the Beautiful", "God Bless America", "The Star-Spangled Banner", "My Country, 'Tis of Thee"],
    correctAnswer: "The Star-Spangled Banner",
    explanation: "The lyrics come from a poem written by Francis Scott Key in 1814.",
    category: "Culture"
  },
  {
    question: "Who was president during the Civil War?",
    options: ["Andrew Jackson", "Ulysses S. Grant", "Abraham Lincoln", "Jefferson Davis"],
    correctAnswer: "Abraham Lincoln",
    explanation: "Lincoln led the nation through its greatest internal crisis.",
    category: "History"
  },
  {
    question: "How many branches of government are there?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
    explanation: "The three branches are Legislative, Executive, and Judicial.",
    category: "Law"
  },
  {
    question: "Which river is the longest in the United States?",
    options: ["Mississippi River", "Missouri River", "Colorado River", "Rio Grande"],
    correctAnswer: "Missouri River",
    explanation: "The Missouri River is slightly longer than the Mississippi River.",
    category: "Geography"
  },
  {
    question: "Who said 'Give me liberty, or give me death!'?",
    options: ["Patrick Henry", "Samuel Adams", "Paul Revere", "Nathan Hale"],
    correctAnswer: "Patrick Henry",
    explanation: "Patrick Henry made this famous speech at the Second Virginia Convention in 1775.",
    category: "History"
  },
  {
    question: "What do the 13 stripes on the flag represent?",
    options: ["13 original colonies", "13 signers of the Constitution", "13 major battles", "13 first presidents"],
    correctAnswer: "13 original colonies",
    explanation: "The stripes represent the original thirteen colonies that declared independence.",
    category: "Heritage"
  },
  {
    question: "Which U.S. state is the smallest by land area?",
    options: ["Delaware", "Rhode Island", "Connecticut", "New Jersey"],
    correctAnswer: "Rhode Island",
    explanation: "Rhode Island is the smallest state, but has a long coastline.",
    category: "Geography"
  },
  {
    question: "Who was the 'Angel of the Battlefield' and founder of the American Red Cross?",
    options: ["Susan B. Anthony", "Clara Barton", "Harriet Tubman", "Eleanor Roosevelt"],
    correctAnswer: "Clara Barton",
    explanation: "Clara Barton founded the American Red Cross in 1881.",
    category: "History"
  },
  {
    question: "Which president signed the Emancipation Proclamation?",
    options: ["Andrew Johnson", "Abraham Lincoln", "Ulysses S. Grant", "James Buchanan"],
    correctAnswer: "Abraham Lincoln",
    explanation: "It declared 'that all persons held as slaves' within the rebellious states 'are, and henceforward shall be free.'",
    category: "History"
  },
  {
    question: "What is the supreme law of the land?",
    options: ["The Bill of Rights", "The Declaration of Independence", "The Constitution", "The Federalist Papers"],
    correctAnswer: "The Constitution",
    explanation: "The Constitution is the framework for the U.S. government.",
    category: "Law"
  },
  {
    question: "Which ocean is on the West Coast of the United States?",
    options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    correctAnswer: "Pacific Ocean",
    explanation: "The Pacific Ocean borders California, Oregon, and Washington.",
    category: "Geography"
  },
  {
    question: "Who was the first woman to serve on the Supreme Court?",
    options: ["Ruth Bader Ginsburg", "Sandra Day O'Connor", "Sonia Sotomayor", "Elena Kagan"],
    correctAnswer: "Sandra Day O'Connor",
    explanation: "She was appointed by President Ronald Reagan in 1981.",
    category: "History"
  },
  {
    question: "What is the nickname of the Liberty Bell's home city?",
    options: ["The Big Apple", "The Windy City", "The City of Brotherly Love", "The Mile High City"],
    correctAnswer: "The City of Brotherly Love",
    explanation: "Philadelphia's name comes from the Greek words for 'brotherly love'.",
    category: "Geography"
  },
  {
    question: "Which war was fought between the North and the South?",
    options: ["Revolutionary War", "War of 1812", "Civil War", "World War I"],
    correctAnswer: "Civil War",
    explanation: "The Civil War was fought from 1861 to 1865.",
    category: "History"
  },
  {
    question: "What is the capital of Texas?",
    options: ["Houston", "Dallas", "Austin", "San Antonio"],
    correctAnswer: "Austin",
    explanation: "Austin has been the capital of Texas since 1839.",
    category: "Geography"
  },
  {
    question: "Who is known as the 'Father of our Country'?",
    options: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "Abraham Lincoln"],
    correctAnswer: "George Washington",
    explanation: "Washington's leadership in the war and presidency earned him this title.",
    category: "History"
  },
  {
    question: "What does the Statue of Liberty hold in her left hand?",
    options: ["A torch", "A sword", "A tablet", "A flag"],
    correctAnswer: "A tablet",
    explanation: "The tablet is inscribed with the date of the Declaration of Independence in Roman numerals.",
    category: "Monuments"
  },
  {
    question: "Which state is known as the 'Sunshine State'?",
    options: ["California", "Arizona", "Florida", "Texas"],
    correctAnswer: "Florida",
    explanation: "Florida's nickname reflects its warm climate and popular beaches.",
    category: "Geography"
  },
  {
    question: "Who was the first person to walk on the moon?",
    options: ["Buzz Aldrin", "Neil Armstrong", "Michael Collins", "Yuri Gagarin"],
    correctAnswer: "Neil Armstrong",
    explanation: "Armstrong stepped onto the lunar surface on July 20, 1969.",
    category: "Innovation"
  },
  {
    question: "Which city is known as the 'Big Apple'?",
    options: ["Los Angeles", "Chicago", "New York City", "Miami"],
    correctAnswer: "New York City",
    explanation: "The nickname became popular in the 1920s.",
    category: "Geography"
  },
  {
    question: "What is the primary language spoken in the United States?",
    options: ["Spanish", "French", "English", "German"],
    correctAnswer: "English",
    explanation: "While there is no official federal language, English is the most widely spoken.",
    category: "Culture"
  },
  {
    question: "How many amendments does the Constitution have?",
    options: ["10", "21", "27", "33"],
    correctAnswer: "27",
    explanation: "The most recent amendment was ratified in 1992.",
    category: "Law"
  },
  {
    question: "What is the lowest point in the United States?",
    options: ["Death Valley", "Grand Canyon", "Everglades", "New Orleans"],
    correctAnswer: "Death Valley",
    explanation: "Badwater Basin in Death Valley is 282 feet below sea level.",
    category: "Geography"
  },
  {
    question: "Who was the first African American president?",
    options: ["Jesse Jackson", "Barack Obama", "Colin Powell", "Cory Booker"],
    correctAnswer: "Barack Obama",
    explanation: "Obama served as the 44th president from 2009 to 2017.",
    category: "History"
  },
  {
    question: "Which state is known as the 'Golden State'?",
    options: ["Nevada", "California", "Colorado", "Arizona"],
    correctAnswer: "California",
    explanation: "The nickname refers to the discovery of gold in 1848.",
    category: "Geography"
  },
  {
    question: "What is the national flower of the United States?",
    options: ["Sunflower", "Rose", "Daisy", "Lily"],
    correctAnswer: "Rose",
    explanation: "The rose was designated as the national floral emblem in 1986.",
    category: "Culture"
  },
  {
    question: "Which document contains the phrase 'all men are created equal'?",
    options: ["The Constitution", "The Declaration of Independence", "The Bill of Rights", "Common Sense"],
    correctAnswer: "The Declaration of Independence",
    explanation: "This fundamental idea is found in the second paragraph of the document.",
    category: "Law"
  },
  {
    question: "Who is the 'Commander in Chief' of the military?",
    options: ["The Secretary of Defense", "The Vice President", "The President", "The Chief of Staff"],
    correctAnswer: "The President",
    explanation: "The Constitution grants the President authority over the armed forces.",
    category: "Law"
  },
  {
    question: "What is the capital of New York?",
    options: ["New York City", "Buffalo", "Albany", "Rochester"],
    correctAnswer: "Albany",
    explanation: "Albany has been the capital since 1797.",
    category: "Geography"
  },
  {
    question: "What are the first ten amendments to the Constitution called?",
    options: ["The Preamble", "The Articles of Confederation", "The Bill of Rights", "The Federalist Papers"],
    correctAnswer: "The Bill of Rights",
    explanation: "These amendments protect individual freedoms and rights.",
    category: "Law"
  },
  {
    question: "Which holiday honors those who died while serving in the military?",
    options: ["Veterans Day", "Memorial Day", "Labor Day", "Presidents' Day"],
    correctAnswer: "Memorial Day",
    explanation: "Memorial Day is observed on the last Monday of May.",
    category: "Culture"
  }
];
