/* ============================================================
   HANGMAN — Word Bank (25 words, 3 progressive hints each)
   ============================================================ */
const WORDS = [
  { word: "APPLE",      hints: ["A common fruit",                     "It can be red, green, or yellow",         "Starts with A"] },
  { word: "BANANA",     hints: ["A tropical fruit",                   "Monkeys love this fruit",                 "Yellow and curved"] },
  { word: "ORANGE",     hints: ["A citrus fruit",                     "Same name as a colour",                   "Squeezed for juice at breakfast"] },
  { word: "ELEPHANT",   hints: ["The largest land animal",            "It has a long trunk",                     "Found in Africa and Asia"] },
  { word: "TIGER",      hints: ["A wild big cat",                     "Has orange fur with black stripes",        "National animal of India"] },
  { word: "PYTHON",     hints: ["A type of snake OR a language",      "Widely used for data science",            "Named after a comedy group"] },
  { word: "JAVASCRIPT", hints: ["A programming language",             "Runs natively in web browsers",           "Often abbreviated as JS"] },
  { word: "COMPUTER",   hints: ["An electronic device",               "Used for processing information",         "Has a CPU and memory"] },
  { word: "KEYBOARD",   hints: ["A computer peripheral",              "Used to type letters and numbers",        "Has QWERTY layout"] },
  { word: "OCEAN",      hints: ["A very large body of water",         "Covers more than 70% of Earth",           "Pacific is the largest one"] },
  { word: "MOUNTAIN",   hints: ["A very tall landform",               "Climbers try to reach the summit",        "Himalayas is a famous range"] },
  { word: "GUITAR",     hints: ["A musical instrument",               "It has six strings",                      "Played with fingers or a pick"] },
  { word: "PIANO",      hints: ["A large musical instrument",         "It has black and white keys",             "Beethoven played this"] },
  { word: "CRICKET",    hints: ["A popular sport",                    "Played with a bat and ball",              "Very popular in India and England"] },
  { word: "CAMERA",     hints: ["An electronic device",               "Used to capture images or videos",        "Has a lens and a shutter"] },
  { word: "INTERNET",   hints: ["A global system",                    "Connects billions of devices worldwide",  "You are using it right now"] },
  { word: "HOSPITAL",   hints: ["A type of building",                 "Doctors and nurses work here",            "People go here when sick"] },
  { word: "DIAMOND",    hints: ["A precious gemstone",                "The hardest natural substance on Earth",  "Found in engagement rings"] },
  { word: "LIBRARY",    hints: ["A public building",                  "Contains thousands of books",             "You need a membership card"] },
  { word: "VOLCANO",    hints: ["A geological feature",               "It can erupt molten lava",                "Pompeii was destroyed by one"] },
  { word: "DOLPHIN",    hints: ["A sea creature",                     "Very intelligent marine mammal",          "Known for clicks and whistles"] },
  { word: "CHOCOLATE",  hints: ["A popular food",                     "Made from cacao beans",                   "Comes in dark, milk, and white varieties"] },
  { word: "RAINBOW",    hints: ["A weather phenomenon",               "Appears after rain when sun shines",      "Has seven colours"] },
  { word: "TELESCOPE",  hints: ["A scientific instrument",            "Used to observe distant objects",         "Astronomers use this to study stars"] },
  { word: "UMBRELLA",   hints: ["A portable device",                  "Used for protection from rain or sun",    "Opens and closes with a button or handle"] }
];

/* QWERTY layout — three proper rows */
const QWERTY_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"]
];

/* ============================================================
   STATE
   ============================================================ */
let currentWord   = "";
let currentHints  = [];
let display       = [];
let attemptsLeft  = 6;
let guessed       = new Set();
let finished      = false;
let hintIndex     = 0;          // how many hints revealed so far (0 = first shown)

/* session-persistent stats */
let wordsSolved     = 0;
let totalPlayed     = 0;
let currentStreak   = 0;
let bestStreak      = 0;

/* ============================================================
   NEW GAME
   ============================================================ */
function newGame() {
  const pick    = WORDS[Math.floor(Math.random() * WORDS.length)];
  currentWord   = pick.word;
  currentHints  = pick.hints;
  display       = Array(currentWord.length).fill("_");
  attemptsLeft  = 6;
  guessed       = new Set();
  finished      = false;
  hintIndex     = 0;

  totalPlayed++;

  document.getElementById("result").textContent      = "";
  document.getElementById("attempts").textContent    = attemptsLeft;
  document.getElementById("wordsSolved").textContent = wordsSolved;
  document.getElementById("word").textContent        = display.join("  ");

  /* show first hint automatically */
  showHint(0);

  /* reset next-hint button */
  const btn = document.getElementById("nextHintBtn");
  btn.disabled      = false;
  btn.style.opacity = "1";

  buildKeyboard();
  updateHighScoreUI();
}

/* ============================================================
   HINT SYSTEM
   ============================================================ */
function showHint(index) {
  hintIndex = index;
  const labels = ["Hint 1", "Hint 2", "Hint 3"];
  document.querySelector("#hintArea .hint-label").textContent =
    labels[index] || "Hint";
  document.getElementById("hintText").textContent = currentHints[index];

  /* disable button when all hints shown */
  if (hintIndex >= currentHints.length - 1) {
    const btn = document.getElementById("nextHintBtn");
    btn.disabled      = true;
    btn.style.opacity = "0.45";
  }
}

function revealNextHint() {
  if (!finished && hintIndex < currentHints.length - 1) {
    showHint(hintIndex + 1);
  }
}

/* ============================================================
   KEYBOARD
   ============================================================ */
function buildKeyboard() {
  const container = document.getElementById("keyboard");
  container.innerHTML = "";

  QWERTY_ROWS.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";

    row.forEach(letter => {
      const btn        = document.createElement("button");
      btn.className    = "key";
      btn.textContent  = letter;
      btn.id           = "key-" + letter;
      btn.addEventListener("click", () => processGuess(letter));
      rowDiv.appendChild(btn);
    });

    container.appendChild(rowDiv);
  });
}

function markKey(letter, result) {
  const btn = document.getElementById("key-" + letter);
  if (!btn) return;
  btn.classList.remove("key-correct", "key-wrong");
  btn.classList.add(result === "correct" ? "key-correct" : "key-wrong");
  btn.disabled = true;
}

/* ============================================================
   GUESS LOGIC
   ============================================================ */
function processGuess(letter) {
  letter = letter.toUpperCase();
  if (finished || guessed.has(letter)) return;
  guessed.add(letter);

  let found = false;
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      display[i] = letter;
      found = true;
    }
  }

  if (found) {
    markKey(letter, "correct");
  } else {
    attemptsLeft--;
    markKey(letter, "wrong");
    document.getElementById("attempts").textContent = attemptsLeft;

    /* auto-reveal next hint on 2nd and 4th wrong guess */
    const wrongCount = 6 - attemptsLeft;
    if (wrongCount === 2 && hintIndex < 1) showHint(1);
    if (wrongCount === 4 && hintIndex < 2) showHint(2);
  }

  document.getElementById("word").textContent = display.join("  ");

  /* WIN */
  if (!display.includes("_")) {
    finished = true;
    wordsSolved++;
    currentStreak++;
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    document.getElementById("result").textContent      = "Correct! Well done 🎉";
    document.getElementById("wordsSolved").textContent = wordsSolved;

    updateHighScoreUI();
    saveScore("hangman", wordsSolved * 10);
    return;
  }

  /* LOSE */
  if (attemptsLeft <= 0) {
    finished = true;
    currentStreak = 0;

    document.getElementById("result").textContent =
      "Game over. The word was: " + currentWord;

    updateHighScoreUI();
  }
}

/* ============================================================
   HIGH SCORE UI
   ============================================================ */
function updateHighScoreUI() {
  document.getElementById("hsBestStreak").textContent  = bestStreak;
  document.getElementById("hsTotalSolved").textContent = wordsSolved;
  document.getElementById("hsTotalPlayed").textContent = totalPlayed;
}

/* ============================================================
   SAVE SCORE TO DB
   ============================================================ */
async function saveScore(gameSlug, score) {
  try {
    await fetch("../php/save_score.php", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ game_slug: gameSlug, score })
    });
  } catch (err) {
    console.warn("Score not saved:", err);
  }
}

/* ============================================================
   PHYSICAL KEYBOARD
   ============================================================ */
document.addEventListener("keydown", (e) => {
  const letter = e.key.toUpperCase();
  if (/^[A-Z]$/.test(letter)) processGuess(letter);
});

/* ============================================================
   START
   ============================================================ */
newGame();
