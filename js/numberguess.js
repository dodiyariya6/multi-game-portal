/* ============================================================
   NUMBER GUESS
   Max 7 attempts. Score starts at 100, -10 per wrong guess.
   ============================================================ */

const MAX_ATTEMPTS = 7;

/* ============================================================
   STATE
   ============================================================ */
let secret;
let attempts;
let score;
let rangeMin;
let rangeMax;
let gameActive = false;

/* session high scores */
let hsBestScore      = 0;
let hsFewestAttempts = null;   /* null = never won */
let hsGamesWon       = 0;

/* ============================================================
   INIT / RESTART
   ============================================================ */
function restart() {
  secret     = Math.floor(Math.random() * 100) + 1;
  attempts   = 0;
  score      = 100;
  rangeMin   = 1;
  rangeMax   = 100;
  gameActive = true;

  document.getElementById("range").textContent    = `${rangeMin} \u2013 ${rangeMax}`;
  document.getElementById("attempts").textContent = attempts;
  document.getElementById("score").textContent    = score;
  document.getElementById("hint").textContent     = "";
  document.getElementById("result").textContent   = "";
  document.getElementById("num").value            = "";
  document.getElementById("num").focus();
}

/* ============================================================
   CHECK GUESS
   ============================================================ */
function check() {
  if (!gameActive) {
    restart();
    return;
  }

  const input = document.getElementById("num");
  const guess = parseInt(input.value, 10);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    document.getElementById("hint").textContent = "Please enter a number between 1 and 100.";
    return;
  }

  attempts++;
  document.getElementById("attempts").textContent = attempts;

  /* Correct guess */
  if (guess === secret) {
    /* Final score cannot drop below 10 */
    score = Math.max(10, 100 - (attempts - 1) * 10);
    document.getElementById("score").textContent  = score;
    document.getElementById("hint").textContent   = "";
    document.getElementById("result").textContent =
      `🎉 Correct! The number was ${secret}. Score: ${score}`;

    gameActive = false;
    hsGamesWon++;
    if (score > hsBestScore) hsBestScore = score;
    if (hsFewestAttempts === null || attempts < hsFewestAttempts) {
      hsFewestAttempts = attempts;
    }

    updateHighScoreUI();
    saveScore("numberguess", score);
    return;
  }

  /* Wrong guess — deduct 10 points */
  score = Math.max(0, score - 10);
  document.getElementById("score").textContent = score;

  if (guess < secret) {
    rangeMin = Math.max(rangeMin, guess + 1);
    document.getElementById("hint").textContent = "Too low! Try higher.";
  } else {
    rangeMax = Math.min(rangeMax, guess - 1);
    document.getElementById("hint").textContent = "Too high! Try lower.";
  }

  document.getElementById("range").textContent = `${rangeMin} \u2013 ${rangeMax}`;
  input.value = "";

  /* Out of attempts */
  if (attempts >= MAX_ATTEMPTS) {
    document.getElementById("result").textContent =
      `Out of attempts! The number was ${secret}.`;
    document.getElementById("hint").textContent = "";
    gameActive = false;
    updateHighScoreUI();
  }
}

/* ============================================================
   HIGH SCORE UI
   ============================================================ */
function updateHighScoreUI() {
  document.getElementById("hsBestScore").textContent =
    hsBestScore > 0 ? hsBestScore : 0;
  document.getElementById("hsFewestAttempts").textContent =
    hsFewestAttempts !== null ? hsFewestAttempts : "--";
  document.getElementById("hsGamesWon").textContent = hsGamesWon;
}

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

/* ============================================================
   ENTER KEY SUPPORT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("num").addEventListener("keydown", (e) => {
    if (e.key === "Enter") check();
  });
});

/* ============================================================
   START
   ============================================================ */
window.onload = restart;
