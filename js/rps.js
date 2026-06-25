/* ============================================================
   ROCK PAPER SCISSORS
   ============================================================ */

const CHOICES = ["rock", "paper", "scissors"];

/* What each choice beats */
const BEATS = {
  rock:     "scissors",
  paper:    "rock",
  scissors: "paper"
};

/* ============================================================
   STATE
   ============================================================ */
let score         = 0;
let wins          = 0;
let losses        = 0;
let totalGames    = 0;
let currentStreak = 0;
let bestStreak    = 0;

/* ============================================================
   PLAY
   ============================================================ */
function play(userChoice) {
  const comp = CHOICES[Math.floor(Math.random() * 3)];
  totalGames++;

  document.getElementById("choices").textContent =
    `You chose ${userChoice}  |  Computer chose ${comp}`;

  let resultText;

  if (userChoice === comp) {
    /* Draw */
    resultText    = "It's a draw!";
    currentStreak = 0;

  } else if (BEATS[userChoice] === comp) {
    /* Win */
    resultText = "You win! 🎉";
    wins++;
    score += 10;
    currentStreak++;
    if (currentStreak > bestStreak) bestStreak = currentStreak;

    /* Save cumulative score on every win so DB stays up to date */
    saveScore("rps", score);

  } else {
    /* Lose */
    resultText    = "You lose!";
    losses++;
    currentStreak = 0;
  }

  document.getElementById("result").textContent  = resultText;
  updateUI();
}

/* ============================================================
   UPDATE UI
   ============================================================ */
function updateUI() {
  document.getElementById("score").textContent   = score;
  document.getElementById("wins").textContent    = wins;
  document.getElementById("losses").textContent  = losses;

  const winRate = totalGames > 0
    ? Math.round((wins / totalGames) * 100)
    : 0;

  document.getElementById("hsBestStreak").textContent = bestStreak;
  document.getElementById("hsTotalWins").textContent  = wins;
  document.getElementById("hsWinRate").textContent    = winRate + "%";
}

/* ============================================================
   KEYBOARD SHORTCUTS  r / p / s
   ============================================================ */
document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT") return;   // don't steal focus from inputs
  if (e.key === "r") play("rock");
  if (e.key === "p") play("paper");
  if (e.key === "s") play("scissors");
});

/* ============================================================
   SAVE SCORE
   ============================================================ */
async function saveScore(gameSlug, scoreValue) {
  try {
    await fetch("../php/save_score.php", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ game_slug: gameSlug, score: scoreValue })
    });
  } catch (err) {
    console.warn("Score not saved:", err);
  }
}
