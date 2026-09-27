import { LevelConfig, Achievement } from '../types/game';

export interface ChapterStory {
  id: 1 | 2;
  number: string;
  title: string;
  subtitle: string;
  originalText: string[];
  keyTakeaways: string[];
}

export const CHAPTERS_STORY: ChapterStory[] = [
  {
    id: 1,
    number: "01",
    title: "Birth & Learning",
    subtitle: "Roots, Education & The Spark of Inquiry",
    originalText: [
      "Bhagat Singh was born on 28 September 1907 in Banga village, in the Lyallpur district of Punjab. At that time, India was under British rule. Today, this place is in Pakistan. He belonged to a Sikh family that was deeply involved in India's freedom movement.",
      "His father, Kishan Singh, and his uncle, Ajit Singh, spoke against British rule. They wanted India to be free. They faced arrest because of their work against the British government. Growing up in this family, Bhagat Singh often heard people talking about freedom, courage, and helping the country.",
      "Bhagat Singh first studied at a village school. Later, he continued his education in Lahore. He was a curious child who liked asking questions and learning new things. He wanted to understand why the British ruled India and why Indians did not have the freedom to run their own country.",
      "He later studied at National College in Lahore. This college was started by Lala Lajpat Rai, an important freedom fighter. Here, Bhagat Singh met other young people who cared about India's future. His time at college helped him learn more about the freedom movement.",
      "Bhagat Singh loved reading. He read about history, politics, and people who fought against unfair rulers. Books helped him understand the problems faced by people in India and other countries. His family, teachers, friends, and reading all helped shape his ideas."
    ],
    keyTakeaways: [
      "Born on 28 September 1907 in Banga village, Lyallpur (now in Pakistan).",
      "His father Kishan Singh and uncle Ajit Singh resisted British rule and faced arrest.",
      "Studied at a village school, then Lahore, and later National College founded by Lala Lajpat Rai.",
      "Voracious reader of history, politics, and struggles against unjust rulers."
    ]
  },
  {
    id: 2,
    number: "02",
    title: "Inspirations & Beliefs",
    subtitle: "Turning Points, Socialism & The Thoughtful Patriot",
    originalText: [
      "One event that deeply affected Bhagat Singh was the Jallianwala Bagh massacre in 1919. British troops fired at a crowd in Amritsar, killing many unarmed people. Bhagat Singh was still a child when this happened. The news made him deeply sad and angry about the way Indians were treated.",
      "As he grew older, he learned about people who had given their lives for India. One of his greatest heroes was Kartar Singh Sarabha. Sarabha was a young freedom fighter who was executed by the British. His courage inspired Bhagat Singh to work for the country.",
      "Bhagat Singh also read the ideas of Karl Marx and Vladimir Lenin. Their writings discussed workers, poverty, and unfair treatment in society. These ideas helped him think about what a free India should be like.",
      "He believed in socialism. In simple words, he wanted a society where wealth and resources were used fairly and where workers and farmers were not treated badly. He wanted every person to have a chance to live with dignity. He believed that removing British rule was only one part of India's freedom. People also needed freedom from poverty and unfair treatment.",
      "Bhagat Singh believed in learning, asking questions, and thinking carefully. While he was in jail, he wrote an essay called Why I Am an Atheist. An atheist is a person who does not believe in God. In this essay, he explained his own beliefs and how he had reached them through thought and study. His writing shows that he was a serious thinker as well as a freedom fighter."
    ],
    keyTakeaways: [
      "Deeply moved as a child by the tragic 1919 Jallianwala Bagh massacre in Amritsar.",
      "Inspired by hero Kartar Singh Sarabha, who gave his life and was executed by the British.",
      "Influenced by Marx and Lenin to champion workers, farmers, and social justice.",
      "Advocated for socialism: fair distribution of wealth, human dignity, and liberation from poverty.",
      "Penned the renowned essay 'Why I Am an Atheist' in prison through reason and study."
    ]
  }
];

export const GAME_LEVELS: LevelConfig[] = [
  // CHAPTER 1 - LEVEL 1 (Quiz)
  {
    id: 1,
    chapterId: 1,
    levelNumberInChapter: 1,
    title: "Origins & Heritage",
    subtitle: "Chapter 1 · Level 1 (Quiz)",
    type: "quiz",
    instructions: "Answer each question based strictly on the text of Chapter 1: Birth & Learning.",
    questions: [
      {
        id: "ch1-q1",
        question: "On what date and in which village was Bhagat Singh born?",
        options: [
          "28 September 1907 in Banga village",
          "15 August 1905 in Amritsar village",
          "23 March 1908 in Lahore town",
          "2 October 1906 in Lyallpur town"
        ],
        correctIndex: 0,
        hint: "Check the very first line of Chapter 1 regarding his exact birth date and village.",
        explanation: "Bhagat Singh was born on 28 September 1907 in Banga village, in the Lyallpur district of Punjab."
      },
      {
        id: "ch1-q2",
        question: "Where is Banga village located today, according to the text?",
        options: [
          "In Bangladesh",
          "In Pakistan",
          "In Nepal",
          "In modern Indian Punjab"
        ],
        correctIndex: 1,
        hint: "The text states that while it was in Punjab under British rule, today this place is situated across the border.",
        explanation: "According to the story: 'At that time, India was under British rule. Today, this place is in Pakistan.'"
      },
      {
        id: "ch1-q3",
        question: "What were the names of Bhagat Singh's father and uncle who spoke against British rule?",
        options: [
          "Lala Lajpat Rai and Kartar Singh",
          "Kishan Singh (father) and Ajit Singh (uncle)",
          "B. K. Dutt and Sukhdev",
          "Rajguru and Ajit Singh"
        ],
        correctIndex: 1,
        hint: "Paragraph 2 names both prominent family members who faced arrest for their opposition to the British.",
        explanation: "The text states: 'His father, Kishan Singh, and his uncle, Ajit Singh, spoke against British rule.'"
      },
      {
        id: "ch1-q4",
        question: "Which college in Lahore did Bhagat Singh attend, and who started it?",
        options: [
          "Presidency College, started by Rabindranath Tagore",
          "National College in Lahore, started by Lala Lajpat Rai",
          "Imperial College, started by Gopal Krishna Gokhale",
          "Punjab Central College, started by Kartar Singh Sarabha"
        ],
        correctIndex: 1,
        hint: "This college was founded by an important freedom fighter and brought together like-minded youth.",
        explanation: "The text confirms: 'He later studied at National College in Lahore. This college was started by Lala Lajpat Rai, an important freedom fighter.'"
      },
      {
        id: "ch1-q5",
        question: "What subjects did Bhagat Singh love reading about, which helped him understand global problems?",
        options: [
          "History, politics, and people who fought against unfair rulers",
          "Commerce, British legal treatises, and mercantile trade",
          "Agricultural chemistry and military cavalry drills",
          "Ancient poetry, drama, and theatrical arts"
        ],
        correctIndex: 0,
        hint: "The final paragraph discusses his great love for books on statecraft and resistance to unjust rule.",
        explanation: "As stated: 'Bhagat Singh loved reading. He read about history, politics, and people who fought against unfair rulers.'"
      }
    ]
  },

  // CHAPTER 1 - LEVEL 2 (Quiz)
  {
    id: 2,
    chapterId: 1,
    levelNumberInChapter: 2,
    title: "Inquiry & Education",
    subtitle: "Chapter 1 · Level 2 (Quiz)",
    type: "quiz",
    instructions: "Test your mastery of the deeper details and quotes from Chapter 1.",
    questions: [
      {
        id: "ch1-q6",
        question: "Why did Kishan Singh and Ajit Singh face arrest by the authorities?",
        options: [
          "Because they refused to pay municipal taxes",
          "Because of their work against the British government",
          "Because they traveled abroad without British passports",
          "Because they started a printing press without approval"
        ],
        correctIndex: 1,
        hint: "Look at the explanation of their activities in the second paragraph of Chapter 1.",
        explanation: "'They wanted India to be free. They faced arrest because of their work against the British government.'"
      },
      {
        id: "ch1-q7",
        question: "Where did Bhagat Singh receive his initial schooling before moving to Lahore?",
        options: [
          "At a boarding school in London",
          "At a village school",
          "At a royal convent in Delhi",
          "Through private tutoring at home only"
        ],
        correctIndex: 1,
        hint: "Chapter 1 mentions his earliest educational institution prior to continuing in Lahore.",
        explanation: "'Bhagat Singh first studied at a village school. Later, he continued his education in Lahore.'"
      },
      {
        id: "ch1-q8",
        question: "As a curious child asking questions, what core puzzle did young Bhagat Singh strive to understand?",
        options: [
          "How British ships traveled between Europe and Asia",
          "Why the British ruled India and why Indians lacked freedom to run their own country",
          "How to obtain employment within the colonial civil administration",
          "Which crops produced the highest yield in the Lyallpur canal colony"
        ],
        correctIndex: 1,
        hint: "The text explains his burning childhood question regarding governance and self-determination.",
        explanation: "'He wanted to understand why the British ruled India and why Indians did not have the freedom to run their own country.'"
      },
      {
        id: "ch1-q9",
        question: "What crucial benefit did attending National College in Lahore provide for Bhagat Singh?",
        options: [
          "He was awarded a British government scholarship",
          "He met other young people who cared about India's future and learned more about the freedom movement",
          "He completed a degree in British constitutional law",
          "He was appointed to an official teaching position"
        ],
        correctIndex: 1,
        hint: "Paragraph 4 highlights how his peers and campus environment expanded his patriotic outlook.",
        explanation: "'Here, Bhagat Singh met other young people who cared about India's future. His time at college helped him learn more about the freedom movement.'"
      },
      {
        id: "ch1-q10",
        question: "According to the concluding sentence of Chapter 1, what factors all helped shape his ideas?",
        options: [
          "Only newspaper editors and political rallies",
          "His family, teachers, friends, and reading",
          "British government circulars and colonial magistrates",
          "Only military manuals and court records"
        ],
        correctIndex: 1,
        hint: "The very last line of the first page summarizes the diverse circle of influences.",
        explanation: "'His family, teachers, friends, and reading all helped shape his ideas.'"
      }
    ]
  },

  // CHAPTER 1 - LEVEL 3 (Unique Game / Puzzle)
  {
    id: 3,
    chapterId: 1,
    levelNumberInChapter: 3,
    title: "Archive Weaver & Word Scramble",
    subtitle: "Chapter 1 · Level 3 (Puzzle)",
    type: "puzzle",
    instructions: "Solve the historical cipher tiles and connect every foundational element from Chapter 1!",
    scrambleItems: [
      {
        id: "scramble-1",
        scrambled: "NABGA",
        solution: "BANGA",
        clue: "The ancestral village where Bhagat Singh was born in Lyallpur district.",
        hint: "Five letters starting with B and ending with A."
      },
      {
        id: "scramble-2",
        scrambled: "HESIAN HKIGN",
        solution: "KISHAN SINGH",
        clue: "Bhagat Singh's father who spoke against British rule and faced arrest.",
        hint: "His first name starts with K, surname is Singh."
      },
      {
        id: "scramble-3",
        scrambled: "TJIANGISH",
        solution: "AJIT SINGH",
        clue: "Bhagat Singh's uncle who fought courageously against colonial rule.",
        hint: "Begins with A, uncle to young Bhagat."
      },
      {
        id: "scramble-4",
        scrambled: "LAAT LPAJ RAIT",
        solution: "LALA LAJPAT RAI",
        clue: "Important freedom fighter who founded National College in Lahore.",
        hint: "Renowned leader with first name Lala."
      }
    ],
    matchPairs: [
      {
        id: "m1",
        term: "Banga Village (Lyallpur)",
        description: "Birthplace on 28 September 1907 (today situated in Pakistan)"
      },
      {
        id: "m2",
        term: "Kishan Singh & Ajit Singh",
        description: "Father and Uncle who resisted British rule and faced arrest"
      },
      {
        id: "m3",
        term: "Village School to Lahore",
        description: "Early inquisitive education questioning why foreign rulers held India"
      },
      {
        id: "m4",
        term: "National College Lahore",
        description: "Founded by Lala Lajpat Rai; united youth dedicated to India's future"
      },
      {
        id: "m5",
        term: "Voracious Reading Habits",
        description: "Studied history, politics, and rebels who fought unfair rulers"
      }
    ]
  },

  // CHAPTER 2 - LEVEL 4 (Quiz)
  {
    id: 4,
    chapterId: 2,
    levelNumberInChapter: 1,
    title: "Awakening & Heroes",
    subtitle: "Chapter 2 · Level 1 (Quiz)",
    type: "quiz",
    instructions: "Answer each question based strictly on the text of Chapter 2: Inspirations & Beliefs.",
    questions: [
      {
        id: "ch2-q1",
        question: "Which tragic event in 1919 deeply affected Bhagat Singh when he was still a child?",
        options: [
          "The Simon Commission protest",
          "The Jallianwala Bagh massacre",
          "The Delhi Assembly bombing",
          "The Kakori train incident"
        ],
        correctIndex: 1,
        hint: "Look at the very first sentence of Chapter 2 mentioning an event in 1919.",
        explanation: "'One event that deeply affected Bhagat Singh was the Jallianwala Bagh massacre in 1919.'"
      },
      {
        id: "ch2-q2",
        question: "What happened during the Jallianwala Bagh tragedy according to the text?",
        options: [
          "British troops fired at a crowd in Amritsar, killing many unarmed people",
          "A diplomatic assembly was boycotted by local representatives",
          "A train carrying British supplies was derailed in Punjab",
          "A peace treaty between landowners was signed"
        ],
        correctIndex: 0,
        hint: "Paragraph 1 details British troop actions against unarmed citizens in Amritsar.",
        explanation: "'British troops fired at a crowd in Amritsar, killing many unarmed people. Bhagat Singh was still a child when this happened.'"
      },
      {
        id: "ch2-q3",
        question: "Who was one of Bhagat Singh's greatest heroes, executed by the British at a young age?",
        options: [
          "Batukeshwar Dutt",
          "Kartar Singh Sarabha",
          "John Saunders",
          "James Scott"
        ],
        correctIndex: 1,
        hint: "Paragraph 2 identifies this young freedom fighter whose courage deeply inspired him.",
        explanation: "'One of his greatest heroes was Kartar Singh Sarabha. Sarabha was a young freedom fighter who was executed by the British.'"
      },
      {
        id: "ch2-q4",
        question: "Whose writings did Bhagat Singh read that discussed workers, poverty, and unfair treatment?",
        options: [
          "John Locke and Thomas Hobbes",
          "Karl Marx and Vladimir Lenin",
          "Adam Smith and David Ricardo",
          "Lord Macaulay and James Mill"
        ],
        correctIndex: 1,
        hint: "Paragraph 3 notes two revolutionary theorists whose ideas influenced his vision of a free India.",
        explanation: "'Bhagat Singh also read the ideas of Karl Marx and Vladimir Lenin. Their writings discussed workers, poverty, and unfair treatment in society.'"
      },
      {
        id: "ch2-q5",
        question: "What essay did Bhagat Singh write while in jail to explain his intellectual beliefs?",
        options: [
          "Why I Am an Atheist",
          "The Call for Independence",
          "Socialism and the Farmer",
          "Freedom and Revolution"
        ],
        correctIndex: 0,
        hint: "The final paragraph mentions this seminal essay composed during his imprisonment.",
        explanation: "'While he was in jail, he wrote an essay called Why I Am an Atheist. In this essay, he explained his own beliefs and how he had reached them through thought and study.'"
      }
    ]
  },

  // CHAPTER 2 - LEVEL 5 (Quiz)
  {
    id: 5,
    chapterId: 2,
    levelNumberInChapter: 2,
    title: "The Vision of Socialism",
    subtitle: "Chapter 2 · Level 2 (Quiz)",
    type: "quiz",
    instructions: "Deep-dive into Bhagat Singh's philosophical ideals and vision for society as described in Chapter 2.",
    questions: [
      {
        id: "ch2-q6",
        question: "How did the news of the Jallianwala Bagh massacre make young Bhagat Singh feel?",
        options: [
          "Impartial and indifferent to foreign rule",
          "Deeply sad and angry about the way Indians were treated",
          "Confident that British courts would deliver justice",
          "Eager to pursue studies in England"
        ],
        correctIndex: 1,
        hint: "The text specifies his exact emotional reaction in paragraph 1 of Chapter 2.",
        explanation: "'The news made him deeply sad and angry about the way Indians were treated.'"
      },
      {
        id: "ch2-q7",
        question: "In simple words, what kind of society did Bhagat Singh believe in under socialism?",
        options: [
          "A society ruled strictly by wealthy merchants and landlords",
          "A society where wealth and resources were used fairly and workers/farmers were not treated badly",
          "A society focused exclusively on industrial exports to foreign markets",
          "A feudal monarchy preserving royal hereditary titles"
        ],
        correctIndex: 1,
        hint: "Review paragraph 4 where the text explicitly defines his vision of socialism in simple words.",
        explanation: "'In simple words, he wanted a society where wealth and resources were used fairly and where workers and farmers were not treated badly.'"
      },
      {
        id: "ch2-q8",
        question: "According to Chapter 2, why was removing British rule only one part of India's freedom?",
        options: [
          "Because people also needed modern British machinery",
          "Because people also needed freedom from poverty and unfair treatment",
          "Because India needed to expand its military borders",
          "Because taxes still had to be collected by imperial authorities"
        ],
        correctIndex: 1,
        hint: "Paragraph 4 explains that true freedom requires more than just replacing foreign rulers.",
        explanation: "'He believed that removing British rule was only one part of India's freedom. People also needed freedom from poverty and unfair treatment.'"
      },
      {
        id: "ch2-q9",
        question: "How does the original text explicitly define an 'atheist'?",
        options: [
          "A person who does not believe in God",
          "A person who avoids politics and social causes",
          "A scholar who only studies ancient manuscripts",
          "A prisoner awaiting trial without bail"
        ],
        correctIndex: 0,
        hint: "Paragraph 5 provides a clear, direct one-sentence definition of an atheist.",
        explanation: "'An atheist is a person who does not believe in God. In this essay, he explained his own beliefs and how he had reached them through thought and study.'"
      },
      {
        id: "ch2-q10",
        question: "What dual portrait of Bhagat Singh emerges from his writings according to the text?",
        options: [
          "He was a serious thinker as well as a freedom fighter",
          "He was merely a spectator of political unrest",
          "He was primarily an aspiring merchant in Lahore",
          "He was an advisor to the British viceroy"
        ],
        correctIndex: 0,
        hint: "The final sentence of Chapter 2 highlights his combined identity as both an intellectual and an activist.",
        explanation: "'His writing shows that he was a serious thinker as well as a freedom fighter.'"
      }
    ]
  },

  // CHAPTER 2 - LEVEL 6 (Unique Game / Puzzle)
  {
    id: 6,
    chapterId: 2,
    levelNumberInChapter: 3,
    title: "Philosophy Matrix & Quote Architect",
    subtitle: "Chapter 2 · Level 3 (Puzzle)",
    type: "puzzle",
    instructions: "Connect the core pillars of Bhagat Singh's philosophy and reconstruct his central ideological declaration!",
    quoteSentence: {
      words: [
        "Removing",
        "British",
        "rule",
        "was",
        "only",
        "one",
        "part",
        "of",
        "India's",
        "freedom.",
        "People",
        "also",
        "needed",
        "freedom",
        "from",
        "poverty",
        "and",
        "unfair",
        "treatment."
      ],
      solution: "Removing British rule was only one part of India's freedom. People also needed freedom from poverty and unfair treatment.",
      context: "Bhagat Singh's definition of true independence from Chapter 2",
      hint: "Start with 'Removing British rule' and conclude with 'poverty and unfair treatment.'"
    },
    matchPairs: [
      {
        id: "cm1",
        term: "Jallianwala Bagh (1919)",
        description: "Amritsar massacre of unarmed crowd by British troops that moved young Bhagat"
      },
      {
        id: "cm2",
        term: "Kartar Singh Sarabha",
        description: "Executed young freedom fighter whose boundless courage became his hero's model"
      },
      {
        id: "cm3",
        term: "Marx & Lenin's Writings",
        description: "Introduced ideas on workers, poverty, and equitable social organization"
      },
      {
        id: "cm4",
        term: "Socialist Society",
        description: "Fair sharing of wealth & resources, dignity for farmers, freedom from poverty"
      },
      {
        id: "cm5",
        term: "Why I Am an Atheist",
        description: "Jailhouse essay explaining convictions reached through thought and study"
      }
    ]
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach_first_step",
    title: "The Village of Banga",
    description: "Successfully complete Level 1 (Chapter 1 Quiz 1) with accurate historical recall.",
    iconName: "Compass",
    unlocked: false,
    points: 100
  },
  {
    id: "ach_inquisitive_mind",
    title: "Inquisitive Mind",
    description: "Conquer Level 2 (Chapter 1 Quiz 2) exploring his education and youthful questions.",
    iconName: "BookOpen",
    unlocked: false,
    points: 120
  },
  {
    id: "ach_archive_master",
    title: "Archive Weaver",
    description: "Solve the word scramble and fact connector puzzle in Level 3.",
    iconName: "Puzzle",
    unlocked: false,
    points: 150
  },
  {
    id: "ach_chapter1_complete",
    title: "Champion of Chapter 1",
    description: "Complete all 3 levels of Chapter 1: Birth & Learning.",
    iconName: "Award",
    unlocked: false,
    points: 200
  },
  {
    id: "ach_amritsar_memory",
    title: "Voice of Justice",
    description: "Master Level 4 exploring the impact of Jallianwala Bagh and Kartar Singh Sarabha.",
    iconName: "Flame",
    unlocked: false,
    points: 120
  },
  {
    id: "ach_socialist_vision",
    title: "Champion of Equality",
    description: "Complete Level 5 examining his vision of socialism, workers, and human dignity.",
    iconName: "Scale",
    unlocked: false,
    points: 140
  },
  {
    id: "ach_quote_architect",
    title: "Philosopher & Patriot",
    description: "Reconstruct the historic quote and match the ideological matrix in Level 6.",
    iconName: "Scroll",
    unlocked: false,
    points: 180
  },
  {
    id: "ach_chapter2_complete",
    title: "Champion of Chapter 2",
    description: "Complete all 3 levels of Chapter 2: Inspirations & Beliefs.",
    iconName: "Crown",
    unlocked: false,
    points: 250
  },
  {
    id: "ach_perfect_streak",
    title: "Sharp Intellect",
    description: "Achieve a 5-question answer streak without a single mistake.",
    iconName: "Zap",
    unlocked: false,
    points: 100
  },
  {
    id: "ach_grand_historian",
    title: "Legacy of Shaheed",
    description: "Complete the entire 6-level journey across both chapters!",
    iconName: "Sparkles",
    unlocked: false,
    points: 350
  }
];
