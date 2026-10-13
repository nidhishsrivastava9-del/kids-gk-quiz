// 100+ High Quality, Age-Appropriate Curated Kids General Knowledge Questions
const seedQuestions = [
  // ==========================================
  // 1. 🌍 WORLD (11 Questions)
  // ==========================================
  {
    id: "world-1",
    question: "How many continents are there on Earth?",
    category: "World",
    difficulty: "Easy",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "Earth has 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
    points: 10
  },
  {
    id: "world-2",
    question: "Which is the largest ocean on Earth?",
    category: "World",
    difficulty: "Easy",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctAnswer: "Pacific Ocean",
    explanation: "The Pacific Ocean is the largest and deepest ocean on our planet, covering more area than all Earth's land combined!",
    points: 10
  },
  {
    id: "world-3",
    question: "In which country can you visit the famous Eiffel Tower?",
    category: "World",
    difficulty: "Easy",
    options: ["Italy", "France", "Germany", "Spain"],
    correctAnswer: "France",
    explanation: "The Eiffel Tower is located in Paris, the capital city of France. It was built in 1889.",
    points: 10
  },
  {
    id: "world-4",
    question: "Which is the largest continent by both land area and population?",
    category: "World",
    difficulty: "Medium",
    options: ["Africa", "Asia", "North America", "Europe"],
    correctAnswer: "Asia",
    explanation: "Asia is the largest continent in the world, home to over 4.7 billion people and countries like India and China!",
    points: 15
  },
  {
    id: "world-5",
    question: "Which country is shaped like a boot on a world map?",
    category: "World",
    difficulty: "Medium",
    options: ["Greece", "Portugal", "Italy", "Japan"],
    correctAnswer: "Italy",
    explanation: "Italy's peninsula looks just like a high-heeled boot kicking the island of Sicily!",
    points: 15
  },
  {
    id: "world-6",
    question: "Which is the longest river in the world?",
    category: "World",
    difficulty: "Medium",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correctAnswer: "Nile River",
    explanation: "The Nile River in Africa is traditionally recognized as the longest river on Earth, flowing over 6,650 kilometers.",
    points: 15
  },
  {
    id: "world-7",
    question: "Which desert is the largest hot desert in the world?",
    category: "World",
    difficulty: "Medium",
    options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Thar Desert"],
    correctAnswer: "Sahara Desert",
    explanation: "The Sahara Desert in North Africa is the largest hot desert, spanning across 11 different countries.",
    points: 15
  },
  {
    id: "world-8",
    question: "What is the capital city of Japan?",
    category: "World",
    difficulty: "Easy",
    options: ["Kyoto", "Tokyo", "Osaka", "Seoul"],
    correctAnswer: "Tokyo",
    explanation: "Tokyo is the bustling capital of Japan, famous for its high-tech trains, cherry blossoms, and delicious sushi.",
    points: 10
  },
  {
    id: "world-9",
    question: "Which country has the most natural lakes in the world?",
    category: "World",
    difficulty: "Challenge",
    options: ["Canada", "Russia", "United States", "Brazil"],
    correctAnswer: "Canada",
    explanation: "Canada has over 2 million lakes, containing more than half of all natural lakes in the entire world!",
    points: 20
  },
  {
    id: "world-10",
    question: "Which is the smallest country in the world by size?",
    category: "World",
    difficulty: "Challenge",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City",
    explanation: "Vatican City is an independent city-state enclosed entirely within Rome, Italy, measuring just 0.49 square kilometers.",
    points: 20
  },
  {
    id: "world-11",
    question: "Which continent is completely covered in ice and has no permanent human residents?",
    category: "World",
    difficulty: "Easy",
    options: ["Antarctica", "Arctic", "Greenland", "Europe"],
    correctAnswer: "Antarctica",
    explanation: "Antarctica is the coldest, windiest continent on Earth and is home to millions of penguins and visiting scientists.",
    points: 10
  },

  // ==========================================
  // 2. 🐾 ANIMALS (11 Questions)
  // ==========================================
  {
    id: "animals-1",
    question: "Which is the largest animal currently living on Earth?",
    category: "Animals",
    difficulty: "Easy",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Colossal Squid"],
    correctAnswer: "Blue Whale",
    explanation: "The Blue Whale is the largest animal ever known to have lived on Earth—even bigger than the largest dinosaurs!",
    points: 10
  },
  {
    id: "animals-2",
    question: "Which bird is the fastest runner and cannot fly?",
    category: "Animals",
    difficulty: "Easy",
    options: ["Penguin", "Ostrich", "Kiwi", "Emu"],
    correctAnswer: "Ostrich",
    explanation: "The Ostrich is the world's largest bird. It cannot fly, but it can sprint up to 70 kilometers per hour!",
    points: 10
  },
  {
    id: "animals-3",
    question: "How many hearts does an octopus have?",
    category: "Animals",
    difficulty: "Medium",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    explanation: "An octopus has 3 hearts! Two pump blood to the gills, while the third pumps oxygenated blood to the rest of the body.",
    points: 15
  },
  {
    id: "animals-4",
    question: "What is a baby kangaroo called?",
    category: "Animals",
    difficulty: "Easy",
    options: ["Cub", "Joey", "Calf", "Pup"],
    correctAnswer: "Joey",
    explanation: "A baby kangaroo is called a Joey. It stays safe and warm inside its mother's pouch while growing.",
    points: 10
  },
  {
    id: "animals-5",
    question: "Which animal is known as the 'Ship of the Desert'?",
    category: "Animals",
    difficulty: "Easy",
    options: ["Camel", "Horse", "Donkey", "Elephant"],
    correctAnswer: "Camel",
    explanation: "Camels are called Ships of the Desert because they can easily travel across sandy dunes without water for days.",
    points: 10
  },
  {
    id: "animals-6",
    question: "Which mammal is the only one capable of true, sustained flight?",
    category: "Animals",
    difficulty: "Medium",
    options: ["Flying Squirrel", "Bat", "Sugar Glider", "Flying Lemur"],
    correctAnswer: "Bat",
    explanation: "Bats are the only mammals with wings that can truly fly through the air rather than just gliding!",
    points: 15
  },
  {
    id: "animals-7",
    question: "What color is a polar bear's skin underneath its white fur?",
    category: "Animals",
    difficulty: "Challenge",
    options: ["Pink", "White", "Black", "Brown"],
    correctAnswer: "Black",
    explanation: "A polar bear's skin is actually jet black! The black skin absorbs heat from the sun to keep the bear warm in freezing temperatures.",
    points: 20
  },
  {
    id: "animals-8",
    question: "Which insect makes delicious honey from flower nectar?",
    category: "Animals",
    difficulty: "Easy",
    options: ["Butterfly", "Honeybee", "Ant", "Ladybug"],
    correctAnswer: "Honeybee",
    explanation: "Honeybees collect nectar from blooming flowers and transform it into sweet, golden honey inside their hives.",
    points: 10
  },
  {
    id: "animals-9",
    question: "Which animal sleeps while standing up and has four legs with hooves?",
    category: "Animals",
    difficulty: "Medium",
    options: ["Horse", "Dog", "Cat", "Kangaroo"],
    correctAnswer: "Horse",
    explanation: "Horses have a special 'stay apparatus' in their leg muscles and tendons that locks their joints so they can sleep standing up!",
    points: 15
  },
  {
    id: "animals-10",
    question: "Which reptile can change its skin color to camouflage with its surroundings?",
    category: "Animals",
    difficulty: "Easy",
    options: ["Crocodile", "Chameleon", "Tortoise", "Snake"],
    correctAnswer: "Chameleon",
    explanation: "Chameleons can shift their skin colors to blend into their environment and to communicate their mood to other chameleons.",
    points: 10
  },
  {
    id: "animals-11",
    question: "What do giant pandas primarily eat?",
    category: "Animals",
    difficulty: "Easy",
    options: ["Fish", "Bamboo", "Berries", "Insects"],
    correctAnswer: "Bamboo",
    explanation: "Bamboo makes up about 99% of a giant panda's diet! They spend up to 12 hours every day munching on bamboo stalks.",
    points: 10
  },

  // ==========================================
  // 3. 🌌 SPACE (11 Questions)
  // ==========================================
  {
    id: "space-1",
    question: "Which planet is known as the 'Red Planet'?",
    category: "Space",
    difficulty: "Easy",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    explanation: "Mars looks red because its rocky surface is covered in iron oxide, commonly known as rust!",
    points: 10
  },
  {
    id: "space-2",
    question: "How many planets are there in our Solar System?",
    category: "Space",
    difficulty: "Easy",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8",
    explanation: "Our Solar System has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
    points: 10
  },
  {
    id: "space-3",
    question: "Which is the largest planet in our Solar System?",
    category: "Space",
    difficulty: "Easy",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: "Jupiter",
    explanation: "Jupiter is a gas giant and the largest planet—so big that all the other planets in the Solar System could fit inside it!",
    points: 10
  },
  {
    id: "space-4",
    question: "Which planet is famous for having large, bright, and beautiful rings?",
    category: "Space",
    difficulty: "Easy",
    options: ["Mars", "Saturn", "Venus", "Mercury"],
    correctAnswer: "Saturn",
    explanation: "Saturn is surrounded by thousands of spectacular rings made of billions of pieces of ice, rock, and dust.",
    points: 10
  },
  {
    id: "space-5",
    question: "What is at the very center of our Solar System?",
    category: "Space",
    difficulty: "Easy",
    options: ["Earth", "The Sun", "The Moon", "Black Hole"],
    correctAnswer: "The Sun",
    explanation: "The Sun is a giant, glowing star at the center of our solar system, providing warmth and light to all planets.",
    points: 10
  },
  {
    id: "space-6",
    question: "Who was the first human to walk on the Moon in 1969?",
    category: "Space",
    difficulty: "Medium",
    options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Michael Collins"],
    correctAnswer: "Neil Armstrong",
    explanation: "American astronaut Neil Armstrong set foot on the Moon on July 20, 1969, saying: 'That's one small step for man, one giant leap for mankind.'",
    points: 15
  },
  {
    id: "space-7",
    question: "Which is the hottest planet in our Solar System, even though it's not closest to the Sun?",
    category: "Space",
    difficulty: "Medium",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Venus",
    explanation: "Venus has a thick atmosphere of greenhouse gases that traps heat, making its surface hotter than an oven (about 465°C)!",
    points: 15
  },
  {
    id: "space-8",
    question: "What is the name of our home galaxy?",
    category: "Space",
    difficulty: "Medium",
    options: ["Andromeda", "Milky Way", "Whirlpool", "Sombrero"],
    correctAnswer: "Milky Way",
    explanation: "Our solar system belongs to the Milky Way galaxy, a giant spiral galaxy containing over 100 billion stars.",
    points: 15
  },
  {
    id: "space-9",
    question: "How long does it take for light from the Sun to reach Earth?",
    category: "Space",
    difficulty: "Challenge",
    options: ["8 seconds", "8 minutes and 20 seconds", "1 hour", "Instantaneous"],
    correctAnswer: "8 minutes and 20 seconds",
    explanation: "Because the Sun is about 150 million kilometers away, sunlight travels through space at the speed of light for about 8 minutes and 20 seconds to reach Earth.",
    points: 20
  },
  {
    id: "space-10",
    question: "Which celestial object was reclassified from a planet to a 'dwarf planet' in 2006?",
    category: "Space",
    difficulty: "Medium",
    options: ["Ceres", "Pluto", "Eris", "Titan"],
    correctAnswer: "Pluto",
    explanation: "In 2006, astronomers classified Pluto as a dwarf planet because it shares its orbit with other icy objects in the Kuiper Belt.",
    points: 15
  },
  {
    id: "space-11",
    question: "What do we call a shooting star that burns up as it enters Earth's atmosphere?",
    category: "Space",
    difficulty: "Easy",
    options: ["Meteor", "Comet", "Asteroid", "Supernova"],
    correctAnswer: "Meteor",
    explanation: "A meteor is a space rock or particle that glows brightly as it speeds through and heats up in Earth's atmosphere.",
    points: 10
  },

  // ==========================================
  // 4. 🔬 SCIENCE (11 Questions)
  // ==========================================
  {
    id: "science-1",
    question: "What are the three main states of matter?",
    category: "Science",
    difficulty: "Easy",
    options: [
      "Solid, Liquid, Gas",
      "Earth, Wind, Fire",
      "Hot, Cold, Warm",
      "Metal, Plastic, Glass"
    ],
    correctAnswer: "Solid, Liquid, Gas",
    explanation: "Everything around us exists mainly as a Solid (like ice), a Liquid (like water), or a Gas (like steam).",
    points: 10
  },
  {
    id: "science-2",
    question: "What is the chemical formula for water?",
    category: "Science",
    difficulty: "Easy",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctAnswer: "H2O",
    explanation: "H2O means each molecule of water is made of two Hydrogen atoms and one Oxygen atom bonded together!",
    points: 10
  },
  {
    id: "science-3",
    question: "Which invisible force pulls objects down toward the center of Earth?",
    category: "Science",
    difficulty: "Easy",
    options: ["Magnetism", "Gravity", "Friction", "Electricity"],
    correctAnswer: "Gravity",
    explanation: "Gravity is the natural force of attraction that keeps our feet on the ground and planets orbiting the sun.",
    points: 10
  },
  {
    id: "science-4",
    question: "Which organ in the human body pumps blood through all our veins and arteries?",
    category: "Science",
    difficulty: "Easy",
    options: ["Lungs", "Heart", "Brain", "Stomach"],
    correctAnswer: "Heart",
    explanation: "The human heart is a powerful muscular organ that beats about 100,000 times a day to pump blood throughout our bodies.",
    points: 10
  },
  {
    id: "science-5",
    question: "What gas do humans breathe in to stay alive, and what gas do we breathe out?",
    category: "Science",
    difficulty: "Medium",
    options: [
      "Inhale Oxygen, Exhale Carbon Dioxide",
      "Inhale Carbon Dioxide, Exhale Oxygen",
      "Inhale Helium, Exhale Nitrogen",
      "Inhale Hydrogen, Exhale Oxygen"
    ],
    correctAnswer: "Inhale Oxygen, Exhale Carbon Dioxide",
    explanation: "Our lungs absorb vital Oxygen from the air and release waste Carbon Dioxide when we exhale.",
    points: 15
  },
  {
    id: "science-6",
    question: "How many bones are there in an adult human body?",
    category: "Science",
    difficulty: "Medium",
    options: ["150", "206", "300", "500"],
    correctAnswer: "206",
    explanation: "Babies are born with around 300 soft bones, but as they grow, many bones fuse together, leaving 206 bones in an adult!",
    points: 15
  },
  {
    id: "science-7",
    question: "What is the hardest natural substance found on Earth?",
    category: "Science",
    difficulty: "Medium",
    options: ["Gold", "Iron", "Diamond", "Granite"],
    correctAnswer: "Diamond",
    explanation: "Diamond is the hardest natural mineral known. Only another diamond can scratch a diamond!",
    points: 15
  },
  {
    id: "science-8",
    question: "What process do green plants use to make food using sunlight, water, and air?",
    category: "Science",
    difficulty: "Medium",
    options: ["Evaporation", "Photosynthesis", "Respiration", "Germination"],
    correctAnswer: "Photosynthesis",
    explanation: "During photosynthesis, chlorophyll in plant leaves captures sunlight to turn water and carbon dioxide into sugars and oxygen.",
    points: 15
  },
  {
    id: "science-9",
    question: "At what temperature does pure water freeze into ice (in Celsius)?",
    category: "Science",
    difficulty: "Easy",
    options: ["0°C", "10°C", "32°C", "100°C"],
    correctAnswer: "0°C",
    explanation: "Water freezes into ice at 0 degrees Celsius (or 32 degrees Fahrenheit) under standard air pressure.",
    points: 10
  },
  {
    id: "science-10",
    question: "Which vitamin is made naturally by human skin when exposed to gentle sunlight?",
    category: "Science",
    difficulty: "Challenge",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    correctAnswer: "Vitamin D",
    explanation: "Vitamin D, often called the 'sunshine vitamin', helps our bodies absorb calcium for strong bones and teeth.",
    points: 20
  },
  {
    id: "science-11",
    question: "What gives green leaves their bright green color?",
    category: "Science",
    difficulty: "Easy",
    options: ["Chlorophyll", "Hemoglobin", "Melanin", "Carotene"],
    correctAnswer: "Chlorophyll",
    explanation: "Chlorophyll is the special green pigment in plant cells that absorbs red and blue light from the sun for photosynthesis.",
    points: 10
  },

  // ==========================================
  // 5. 🏛️ HISTORY (10 Questions)
  // ==========================================
  {
    id: "history-1",
    question: "Who were the great rulers and kings of Ancient Egypt called?",
    category: "History",
    difficulty: "Easy",
    options: ["Emperors", "Pharaohs", "Sultans", "Tsars"],
    correctAnswer: "Pharaohs",
    explanation: "In Ancient Egypt, rulers were known as Pharaohs, such as King Tutankhamun and Ramses the Great.",
    points: 10
  },
  {
    id: "history-2",
    question: "Which ancient civilization built the Colosseum in Rome?",
    category: "History",
    difficulty: "Easy",
    options: ["The Greeks", "The Romans", "The Mayans", "The Vikings"],
    correctAnswer: "The Romans",
    explanation: "The Ancient Romans built the massive stone Colosseum around 2,000 years ago for games, shows, and contests.",
    points: 10
  },
  {
    id: "history-3",
    question: "Who invented the telephone in 1876?",
    category: "History",
    difficulty: "Medium",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"],
    correctAnswer: "Alexander Graham Bell",
    explanation: "Alexander Graham Bell received the first official patent for the electric telephone in 1876.",
    points: 15
  },
  {
    id: "history-4",
    question: "Which famous brothers made the first successful controlled airplane flight in 1903?",
    category: "History",
    difficulty: "Easy",
    options: ["The Wright Brothers", "The Warner Brothers", "The Grimm Brothers", "The Montgolfier Brothers"],
    correctAnswer: "The Wright Brothers",
    explanation: "Orville and Wilbur Wright flew their historic 'Flyer' airplane at Kitty Hawk, North Carolina in December 1903.",
    points: 10
  },
  {
    id: "history-5",
    question: "Which massive stone wall was built across northern China to protect against invasions?",
    category: "History",
    difficulty: "Easy",
    options: ["Berlin Wall", "The Great Wall of China", "Hadrian's Wall", "Western Wall"],
    correctAnswer: "The Great Wall of China",
    explanation: "The Great Wall of China is a series of fortifications over 21,000 kilometers long built across many dynasties.",
    points: 10
  },
  {
    id: "history-6",
    question: "Who wrote the famous diary while hiding during World War II?",
    category: "History",
    difficulty: "Medium",
    options: ["Helen Keller", "Anne Frank", "Marie Curie", "Florence Nightingale"],
    correctAnswer: "Anne Frank",
    explanation: "Anne Frank was a young Jewish girl whose poignant diary became one of the world's most famous and read books.",
    points: 15
  },
  {
    id: "history-7",
    question: "Which scientist discovered the law of gravity after watching an apple fall from a tree?",
    category: "History",
    difficulty: "Easy",
    options: ["Isaac Newton", "Galileo Galilei", "Charles Darwin", "Archimedes"],
    correctAnswer: "Isaac Newton",
    explanation: "Sir Isaac Newton formulated the universal laws of motion and gravity in the 17th century.",
    points: 10
  },
  {
    id: "history-8",
    question: "In ancient times, which ocean-sailing people were famous for longships and horned helmet myths?",
    category: "History",
    difficulty: "Medium",
    options: ["The Romans", "The Vikings", "The Spartans", "The Aztecs"],
    correctAnswer: "The Vikings",
    explanation: "The Vikings were seafaring explorers and traders from Scandinavia who sailed across Europe and North America.",
    points: 15
  },
  {
    id: "history-9",
    question: "What prehistoric creatures went extinct about 66 million years ago after an asteroid impact?",
    category: "History",
    difficulty: "Easy",
    options: ["Mammoths", "Dinosaurs", "Sabertooth Tigers", "Dodos"],
    correctAnswer: "Dinosaurs",
    explanation: "Dinosaurs ruled the Earth for over 160 million years before a giant asteroid collided with Earth near modern-day Mexico.",
    points: 10
  },
  {
    id: "history-10",
    question: "Who was the first woman to win a Nobel Prize, and the only person to win in two different scientific fields?",
    category: "History",
    difficulty: "Challenge",
    options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Jane Goodall"],
    correctAnswer: "Marie Curie",
    explanation: "Marie Curie won Nobel Prizes in Physics (1903) and Chemistry (1911) for her pioneering research on radioactivity.",
    points: 20
  },

  // ==========================================
  // 6. 🌱 NATURE (10 Questions)
  // ==========================================
  {
    id: "nature-1",
    question: "What is the continuous cycle of water evaporating, condensing into clouds, and falling as rain called?",
    category: "Nature",
    difficulty: "Easy",
    options: ["The Carbon Cycle", "The Water Cycle", "The Rock Cycle", "The Moon Cycle"],
    correctAnswer: "The Water Cycle",
    explanation: "The Water Cycle constantly moves water from oceans and rivers into the sky and back down as rain and snow.",
    points: 10
  },
  {
    id: "nature-2",
    question: "How many colors are traditionally recognized in a natural rainbow?",
    category: "Nature",
    difficulty: "Easy",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7",
    explanation: "A rainbow has 7 colors remembered by ROYGBIV: Red, Orange, Yellow, Green, Blue, Indigo, and Violet.",
    points: 10
  },
  {
    id: "nature-3",
    question: "Which is the largest tropical rainforest in the world?",
    category: "Nature",
    difficulty: "Easy",
    options: ["Congo Rainforest", "Amazon Rainforest", "Daintree Rainforest", "Sundarbans"],
    correctAnswer: "Amazon Rainforest",
    explanation: "The Amazon Rainforest in South America is so huge it is often called the 'Lungs of the Earth'.",
    points: 10
  },
  {
    id: "nature-4",
    question: "What do we call molten liquid rock when it erupts out of a volcano onto the surface?",
    category: "Nature",
    difficulty: "Easy",
    options: ["Magma", "Lava", "Ash", "Obsidian"],
    correctAnswer: "Lava",
    explanation: "Inside the Earth it is called magma; once it breaks through the volcano's vent to the surface, it is called lava.",
    points: 10
  },
  {
    id: "nature-5",
    question: "Which type of trees keep their green needles or leaves throughout all four seasons?",
    category: "Nature",
    difficulty: "Medium",
    options: ["Deciduous trees", "Evergreen trees", "Flowering trees", "Fruit trees"],
    correctAnswer: "Evergreen trees",
    explanation: "Evergreen trees (like pines and firs) stay green year-round, unlike deciduous trees that shed their leaves in autumn.",
    points: 15
  },
  {
    id: "nature-6",
    question: "What natural event is caused by sudden slipping along fault lines deep inside the Earth's crust?",
    category: "Nature",
    difficulty: "Easy",
    options: ["Earthquake", "Tornado", "Blizzard", "Thunderstorm"],
    correctAnswer: "Earthquake",
    explanation: "Earthquakes happen when tectonic plates beneath Earth's surface suddenly shift and release energy in seismic waves.",
    points: 10
  },
  {
    id: "nature-7",
    question: "What is the name of the highest mountain peak in the world above sea level?",
    category: "Nature",
    difficulty: "Easy",
    options: ["Mount Kilimanjaro", "Mount Everest", "K2", "Mount Fuji"],
    correctAnswer: "Mount Everest",
    explanation: "Mount Everest in the Himalayas stands at 8,848.86 meters (29,031.7 feet) high on the border of Nepal and China.",
    points: 10
  },
  {
    id: "nature-8",
    question: "What do we count inside a cut tree trunk to determine how many years old the tree is?",
    category: "Nature",
    difficulty: "Easy",
    options: ["Leaves", "Branches", "Growth Rings", "Roots"],
    correctAnswer: "Growth Rings",
    explanation: "Trees grow a new layer of wood every year. Counting the concentric tree rings reveals the tree's exact age!",
    points: 10
  },
  {
    id: "nature-9",
    question: "Which layer in Earth's atmosphere protects living things from harmful ultraviolet (UV) sun rays?",
    category: "Nature",
    difficulty: "Medium",
    options: ["Ozone Layer", "Troposphere", "Ionosphere", "Mesosphere"],
    correctAnswer: "Ozone Layer",
    explanation: "The ozone layer in the stratosphere acts as Earth's natural sunscreen, absorbing most high-energy UV radiation.",
    points: 15
  },
  {
    id: "nature-10",
    question: "What are the giant floating masses of freshwater ice in polar oceans called?",
    category: "Nature",
    difficulty: "Easy",
    options: ["Islands", "Icebergs", "Glaciers", "Reefs"],
    correctAnswer: "Icebergs",
    explanation: "Icebergs break off from polar glaciers. Around 90% of an iceberg's total volume hides beneath the ocean water surface!",
    points: 10
  },

  // ==========================================
  // 7. ⚽ SPORTS (10 Questions)
  // ==========================================
  {
    id: "sports-1",
    question: "How many players are on the field for one team in a standard soccer (football) match?",
    category: "Sports",
    difficulty: "Easy",
    options: ["9", "10", "11", "12"],
    correctAnswer: "11",
    explanation: "Each soccer team has 11 players on the pitch, including 1 goalkeeper and 10 outfield players.",
    points: 10
  },
  {
    id: "sports-2",
    question: "How many colored rings are linked together on the official Olympic flag?",
    category: "Sports",
    difficulty: "Easy",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
    explanation: "The 5 interlocking Olympic rings (Blue, Yellow, Black, Green, Red) symbolize the unity of the world's 5 major continents.",
    points: 10
  },
  {
    id: "sports-3",
    question: "In basketball, how many points is a regular shot made from inside the three-point arc worth?",
    category: "Sports",
    difficulty: "Easy",
    options: ["1 point", "2 points", "3 points", "4 points"],
    correctAnswer: "2 points",
    explanation: "A standard field goal made inside the arc is worth 2 points, while free throws are worth 1 point.",
    points: 10
  },
  {
    id: "sports-4",
    question: "Which sport uses a racket to hit a lightweight feathered projectile called a shuttlecock?",
    category: "Sports",
    difficulty: "Easy",
    options: ["Tennis", "Table Tennis", "Badminton", "Squash"],
    correctAnswer: "Badminton",
    explanation: "Badminton is played with lightweight rackets and a feathered or plastic shuttlecock hit back and forth over a net.",
    points: 10
  },
  {
    id: "sports-5",
    question: "In cricket, how many runs is awarded when a batter hits the ball over the boundary rope without it bouncing?",
    category: "Sports",
    difficulty: "Easy",
    options: ["2 runs", "4 runs", "6 runs", "8 runs"],
    correctAnswer: "6 runs",
    explanation: "If the cricket ball flies over the boundary rope on the full without touching the ground, the team scores 6 runs!",
    points: 10
  },
  {
    id: "sports-6",
    question: "How often are the Summer Olympic Games held?",
    category: "Sports",
    difficulty: "Easy",
    options: ["Every year", "Every 2 years", "Every 4 years", "Every 5 years"],
    correctAnswer: "Every 4 years",
    explanation: "The Olympic Games are traditionally held every 4 years, bringing athletes from over 200 nations together.",
    points: 10
  },
  {
    id: "sports-7",
    question: "What is the standard distance of a full marathon race?",
    category: "Sports",
    difficulty: "Medium",
    options: ["21.1 km", "42.195 km", "50 km", "100 km"],
    correctAnswer: "42.195 km",
    explanation: "An official marathon is exactly 42.195 kilometers (26 miles and 385 yards) long.",
    points: 15
  },
  {
    id: "sports-8",
    question: "In bowling, what do you call knocking down all 10 pins on the very first roll?",
    category: "Sports",
    difficulty: "Easy",
    options: ["Spare", "Strike", "Ace", "Homerun"],
    correctAnswer: "Strike",
    explanation: "A strike (marked as 'X' on the scoreboard) happens when you knock down all 10 pins with your first roll!",
    points: 10
  },
  {
    id: "sports-9",
    question: "Which swimming stroke is done facing down with arms moving simultaneously in a large sweeping motion?",
    category: "Sports",
    difficulty: "Medium",
    options: ["Backstroke", "Freestyle", "Butterfly", "Dog Paddle"],
    correctAnswer: "Butterfly",
    explanation: "The Butterfly stroke requires powerful simultaneous arm pulls and a dolphin-style kick.",
    points: 15
  },
  {
    id: "sports-10",
    question: "In tennis, what special term means a score of zero?",
    category: "Sports",
    difficulty: "Challenge",
    options: ["Nil", "Zero", "Love", "Duck"],
    correctAnswer: "Love",
    explanation: "In tennis scoring, 'Love' means 0 points, possibly derived from the French word 'l'oeuf' meaning egg (shaped like a zero)!",
    points: 20
  },

  // ==========================================
  // 8. 🇮🇳 INDIA (12 Questions)
  // ==========================================
  {
    id: "india-1",
    question: "What is the capital city of India?",
    category: "India",
    difficulty: "Easy",
    options: ["Mumbai", "New Delhi", "Kolkata", "Bengaluru"],
    correctAnswer: "New Delhi",
    explanation: "New Delhi is the official national capital of India, housing the Parliament and Rashtrapati Bhavan.",
    points: 10
  },
  {
    id: "india-2",
    question: "What is the National Animal of India?",
    category: "India",
    difficulty: "Easy",
    options: ["Lion", "Royal Bengal Tiger", "Elephant", "Leopard"],
    correctAnswer: "Royal Bengal Tiger",
    explanation: "The majestic Royal Bengal Tiger is the National Animal of India, symbolizing grace, strength, and power.",
    points: 10
  },
  {
    id: "india-3",
    question: "Which beautiful white marble monument was built in Agra by Emperor Shah Jahan?",
    category: "India",
    difficulty: "Easy",
    options: ["Qutub Minar", "Red Fort", "Taj Mahal", "Hawa Mahal"],
    correctAnswer: "Taj Mahal",
    explanation: "The Taj Mahal in Agra was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal and is one of the Wonders of the World.",
    points: 10
  },
  {
    id: "india-4",
    question: "What is the National Bird of India?",
    category: "India",
    difficulty: "Easy",
    options: ["Peacock", "Parrot", "Sparrow", "Eagle"],
    correctAnswer: "Peacock",
    explanation: "The Indian Peacock (Pavo cristatus) is the National Bird of India, famous for its colorful iridescent feathers.",
    points: 10
  },
  {
    id: "india-5",
    question: "How many spokes are there in the Ashoka Chakra on the Indian National Flag?",
    category: "India",
    difficulty: "Easy",
    options: ["18", "20", "24", "32"],
    correctAnswer: "24",
    explanation: "The navy blue Ashoka Chakra in the center of the Indian Tiranga flag has 24 spokes representing 24 hours of progress and righteousness.",
    points: 10
  },
  {
    id: "india-6",
    question: "What is the National Flower of India?",
    category: "India",
    difficulty: "Easy",
    options: ["Rose", "Lotus", "Sunflower", "Marigold"],
    correctAnswer: "Lotus",
    explanation: "The sacred Lotus (Nelumbo nucifera) is the National Flower of India, symbolizing purity, wisdom, and beauty.",
    points: 10
  },
  {
    id: "india-7",
    question: "Which is the longest river flowing entirely or primarily within India?",
    category: "India",
    difficulty: "Medium",
    options: ["Yamuna", "Ganga", "Godavari", "Narmada"],
    correctAnswer: "Ganga",
    explanation: "The holy River Ganga flows over 2,525 kilometers from the Himalayas through northern India into the Bay of Bengal.",
    points: 15
  },
  {
    id: "india-8",
    question: "Who was the first Prime Minister of independent India?",
    category: "India",
    difficulty: "Medium",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Dr. B. R. Ambedkar"],
    correctAnswer: "Jawaharlal Nehru",
    explanation: "Pandit Jawaharlal Nehru became India's first Prime Minister in 1947, affectionately known to children as 'Chacha Nehru'.",
    points: 15
  },
  {
    id: "india-9",
    question: "What is the National Fruit of India?",
    category: "India",
    difficulty: "Easy",
    options: ["Banana", "Apple", "Mango", "Guava"],
    correctAnswer: "Mango",
    explanation: "The delicious, sweet Mango is the King of Fruits and the National Fruit of India.",
    points: 10
  },
  {
    id: "india-10",
    question: "Which Indian state is famously known as 'God's Own Country'?",
    category: "India",
    difficulty: "Medium",
    options: ["Goa", "Kerala", "Himachal Pradesh", "Tamil Nadu"],
    correctAnswer: "Kerala",
    explanation: "Kerala is nicknamed 'God's Own Country' due to its lush greenery, serene backwaters, coconut palms, and spice gardens.",
    points: 15
  },
  {
    id: "india-11",
    question: "What is the name of the tallest statue in the world, located in Gujarat, India?",
    category: "India",
    difficulty: "Medium",
    options: ["Statue of Liberty", "Statue of Unity", "Spring Temple Buddha", "Christ the Redeemer"],
    correctAnswer: "Statue of Unity",
    explanation: "The Statue of Unity honors Sardar Vallabhbhai Patel and stands at a colossal 182 meters (597 feet) high!",
    points: 15
  },
  {
    id: "india-12",
    question: "Which Indian festival of lights celebrates the victory of light over darkness?",
    category: "India",
    difficulty: "Easy",
    options: ["Holi", "Diwali", "Eid", "Navratri"],
    correctAnswer: "Diwali",
    explanation: "Diwali (Deepavali) is the joyous festival of lights celebrated across India with diyas, sweets, fireworks, and rangoli.",
    points: 10
  },

  // ==========================================
  // 9. 🎨 ARTS & CULTURE (10 Questions)
  // ==========================================
  {
    id: "arts-1",
    question: "Which three colors are known as the Primary Colors in painting?",
    category: "Arts & Culture",
    difficulty: "Easy",
    options: [
      "Red, Blue, Yellow",
      "Green, Orange, Purple",
      "Black, White, Gray",
      "Pink, Cyan, Brown"
    ],
    correctAnswer: "Red, Blue, Yellow",
    explanation: "Red, Blue, and Yellow are primary colors because you cannot create them by mixing other colors, but they can mix to make all other colors!",
    points: 10
  },
  {
    id: "arts-2",
    question: "Who painted the world-famous portrait called the Mona Lisa?",
    category: "Arts & Culture",
    difficulty: "Easy",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci",
    explanation: "Italian renaissance polymath Leonardo da Vinci painted the enigmatic Mona Lisa in the early 1500s.",
    points: 10
  },
  {
    id: "arts-3",
    question: "Which musical instrument has 88 black and white keys?",
    category: "Arts & Culture",
    difficulty: "Easy",
    options: ["Guitar", "Piano", "Violin", "Flute"],
    correctAnswer: "Piano",
    explanation: "A modern full-size acoustic piano has 88 keys: 52 white keys (natural notes) and 36 black keys (accidentals).",
    points: 10
  },
  {
    id: "arts-4",
    question: "What color do you get when you mix Yellow and Blue paint together?",
    category: "Arts & Culture",
    difficulty: "Easy",
    options: ["Orange", "Green", "Purple", "Brown"],
    correctAnswer: "Green",
    explanation: "Mixing the primary colors Yellow and Blue creates the secondary color Green!",
    points: 10
  },
  {
    id: "arts-5",
    question: "Which classical Indian string instrument was made world-famous by Pandit Ravi Shankar?",
    category: "Arts & Culture",
    difficulty: "Medium",
    options: ["Sitar", "Tabla", "Harmonium", "Flute"],
    correctAnswer: "Sitar",
    explanation: "The sitar is a long-necked plucked string instrument widely used in classical Hindustani music.",
    points: 15
  },
  {
    id: "arts-6",
    question: "Who is the boy wizard hero in the famous book series written by J.K. Rowling?",
    category: "Arts & Culture",
    difficulty: "Easy",
    options: ["Percy Jackson", "Harry Potter", "Peter Pan", "Frodo Baggins"],
    correctAnswer: "Harry Potter",
    explanation: "Harry Potter is the beloved student at Hogwarts School of Witchcraft and Wizardry.",
    points: 10
  },
  {
    id: "arts-7",
    question: "What is the traditional art of paper folding from Japan called?",
    category: "Arts & Culture",
    difficulty: "Easy",
    options: ["Origami", "Bonsai", "Ikebana", "Karaoke"],
    correctAnswer: "Origami",
    explanation: "Origami (from 'ori' meaning folding and 'kami' meaning paper) is the creative Japanese art of transforming flat sheets of paper into sculptures.",
    points: 10
  },
  {
    id: "arts-8",
    question: "Which famous artist painted the colorful, swirling masterpiece 'The Starry Night'?",
    category: "Arts & Culture",
    difficulty: "Medium",
    options: ["Vincent van Gogh", "Salvador Dalí", "Henri Matisse", "Michelangelo"],
    correctAnswer: "Vincent van Gogh",
    explanation: "Dutch painter Vincent van Gogh created 'The Starry Night' in 1889, capturing the view from his window with vibrant blues and yellow stars.",
    points: 15
  },
  {
    id: "arts-9",
    question: "Which ancient Greek fable tells the story of a slow tortoise beating a fast hare in a race?",
    category: "Arts & Culture",
    difficulty: "Easy",
    options: ["The Tortoise and the Hare", "The Boy Who Cried Wolf", "The Ant and the Grasshopper", "The Lion and the Mouse"],
    correctAnswer: "The Tortoise and the Hare",
    explanation: "Aesop's fable teaches that 'slow and steady wins the race' through the perseverance of the tortoise.",
    points: 10
  },
  {
    id: "arts-10",
    question: "What family of musical instruments do the trumpet, trombone, and tuba belong to?",
    category: "Arts & Culture",
    difficulty: "Medium",
    options: ["Woodwind", "Brass", "Percussion", "Strings"],
    correctAnswer: "Brass",
    explanation: "Brass instruments are made of shiny metal and produce sound by the player buzzing their lips into a cup-shaped mouthpiece.",
    points: 15
  },

  // ==========================================
  // 10. 🧠 MIXED GK (15 Questions)
  // ==========================================
  {
    id: "mixed-1",
    question: "How many hours are there in one complete day?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["12 hours", "24 hours", "48 hours", "60 hours"],
    correctAnswer: "24 hours",
    explanation: "One full Earth rotation takes 24 hours, giving us a day and a night cycle.",
    points: 10
  },
  {
    id: "mixed-2",
    question: "How many days are in a leap year?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["364", "365", "366", "367"],
    correctAnswer: "366",
    explanation: "A regular year has 365 days, while a leap year has 366 days because February gets an extra 29th day!",
    points: 10
  },
  {
    id: "mixed-3",
    question: "Which traffic light color tells drivers to come to a complete stop?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["Green", "Yellow", "Red", "Blue"],
    correctAnswer: "Red",
    explanation: "Red means Stop, Yellow means Slow Down / Prepare to Stop, and Green means Go!",
    points: 10
  },
  {
    id: "mixed-4",
    question: "How many sides does an octagon have?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["6", "7", "8", "10"],
    correctAnswer: "8",
    explanation: "An octagon is an 8-sided geometric polygon, just like a standard red STOP sign!",
    points: 10
  },
  {
    id: "mixed-5",
    question: "Which sense organ helps us smell pleasant flowers and fresh cookies?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["Eyes", "Ears", "Nose", "Tongue"],
    correctAnswer: "Nose",
    explanation: "Our nose contains olfactory receptors that detect scents and send signals to our brain.",
    points: 10
  },
  {
    id: "mixed-6",
    question: "What is the freezing point of water on the Fahrenheit scale?",
    category: "Mixed GK",
    difficulty: "Medium",
    options: ["0°F", "32°F", "100°F", "212°F"],
    correctAnswer: "32°F",
    explanation: "On the Fahrenheit scale, water freezes at 32°F and boils at 212°F.",
    points: 15
  },
  {
    id: "mixed-7",
    question: "Which device is used to measure temperature accurately?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["Barometer", "Thermometer", "Speedometer", "Compass"],
    correctAnswer: "Thermometer",
    explanation: "A thermometer measures temperature in degrees Celsius or Fahrenheit.",
    points: 10
  },
  {
    id: "mixed-8",
    question: "What is the name of the imaginary line that divides Earth into the Northern and Southern Hemispheres?",
    category: "Mixed GK",
    difficulty: "Medium",
    options: ["Prime Meridian", "Equator", "Tropic of Cancer", "Arctic Circle"],
    correctAnswer: "Equator",
    explanation: "The Equator is an imaginary line around the middle of Earth halfway between the North and South Poles.",
    points: 15
  },
  {
    id: "mixed-9",
    question: "Which fruit is known for keeping the doctor away according to a famous proverb?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["Banana", "Apple", "Orange", "Strawberry"],
    correctAnswer: "Apple",
    explanation: "The old saying goes: 'An apple a day keeps the doctor away' because apples are rich in fiber and vitamins!",
    points: 10
  },
  {
    id: "mixed-10",
    question: "What do we call a shape with three straight sides and three angles?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["Square", "Circle", "Triangle", "Rectangle"],
    correctAnswer: "Triangle",
    explanation: "A triangle has 3 sides and 3 interior angles whose sum is always 180 degrees.",
    points: 10
  },
  {
    id: "mixed-11",
    question: "Which is the tallest land animal on Earth?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["Elephant", "Giraffe", "Ostrich", "Camel"],
    correctAnswer: "Giraffe",
    explanation: "A full-grown giraffe can stand up to nearly 6 meters (19 feet) tall thanks to its long neck and legs!",
    points: 10
  },
  {
    id: "mixed-12",
    question: "How many letters are in the standard English alphabet?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["24", "26", "28", "30"],
    correctAnswer: "26",
    explanation: "The English alphabet has 26 letters, from A to Z, including 5 main vowels (A, E, I, O, U) and 21 consonants.",
    points: 10
  },
  {
    id: "mixed-13",
    question: "What is the name of the tool used by sailors to find North using a magnetic needle?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["Telescope", "Compass", "Clock", "Ruler"],
    correctAnswer: "Compass",
    explanation: "A magnetic compass needle points towards Earth's magnetic North pole, helping explorers navigate.",
    points: 10
  },
  {
    id: "mixed-14",
    question: "Which mineral makes our bones and teeth strong and is found in milk and cheese?",
    category: "Mixed GK",
    difficulty: "Medium",
    options: ["Iron", "Calcium", "Zinc", "Potassium"],
    correctAnswer: "Calcium",
    explanation: "Calcium is an essential mineral for building and maintaining strong bones and healthy teeth.",
    points: 15
  },
  {
    id: "mixed-15",
    question: "How many primary colors are on an artist's palette?",
    category: "Mixed GK",
    difficulty: "Easy",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
    explanation: "There are 3 traditional primary colors: Red, Yellow, and Blue.",
    points: 10
  }
];

module.exports = seedQuestions;
