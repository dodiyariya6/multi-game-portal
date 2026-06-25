/* ============================================================
   TIC TAC TOE — Beatable AI
   Computer plays smart ~60% of the time, random 40%
   So players can actually win and have fun!
   ============================================================ */

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

/* ============================================================
   STATE
   ============================================================ */
let board    = Array(9).fill("");
let gameOver = false;

let wins          = 0;
let losses        = 0;
let draws         = 0;
let totalGames    = 0;
let currentStreak = 0;
let bestStreak    = 0;

/* ============================================================
   RENDER
   ============================================================ */
function renderBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";

  board.forEach((val, i) => {
    const cell       = document.createElement("div");
    cell.className   = "board-cell";
    cell.textContent = val;

    if (val === "X") cell.classList.add("x-cell", "taken");
    if (val === "O") cell.classList.add("o-cell", "taken");

    cell.addEventListener("click", () => playerMove(i));
    boardDiv.appendChild(cell);
  });
}

/* ============================================================
   PLAYER MOVE
   ============================================================ */
function playerMove(i) {
  if (board[i] !== "" || gameOver) return;

  board[i] = "X";
  renderBoard();

  if (checkWin("X")) {
    endGame("You win! 🎉");
    wins++;
    totalGames++;
    currentStreak++;
    if (currentStreak > bestStreak) bestStreak = currentStreak;
    updateStats();
    saveScore("tictactoe", wins * 10);
    return;
  }

  if (isBoardFull()) {
    endGame("It's a draw!");
    draws++;
    totalGames++;
    currentStreak = 0;
    updateStats();
    return;
  }

  setTimeout(computerMove, 350);
}

/* ============================================================
   COMPUTER MOVE — beatable mixed AI
   60% smart (win > block > center > corner > random)
   40% fully random — gives player a real chance to win
   ============================================================ */
function computerMove() {
  const empty = board
    .map((v, i) => v === "" ? i : null)
    .filter(v => v !== null);

  if (empty.length === 0) return;

  const move = Math.random() < 0.6
    ? getSmartMove(empty)
    : empty[Math.floor(Math.random() * empty.length)];

  board[move] = "O";
  renderBoard();

  if (checkWin("O")) {
    endGame("Computer wins.");
    losses++;
    totalGames++;
    currentStreak = 0;
    updateStats();
    return;
  }

  if (isBoardFull()) {
    endGame("It's a draw!");
    draws++;
    totalGames++;
    currentStreak = 0;
    updateStats();
  }
}

/* ============================================================
   SMART MOVE — win > block > center > corner > side
   ============================================================ */
function getSmartMove(empty) {
  const win   = findThreat("O");
  if (win   !== -1) return win;

  const block = findThreat("X");
  if (block !== -1) return block;

  if (board[4] === "") return 4;

  const corners = [0,2,6,8].filter(i => board[i] === "");
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

  return empty[Math.floor(Math.random() * empty.length)];
}

function findThreat(mark) {
  for (const line of WIN_LINES) {
    const vals = line.map(i => board[i]);
    if (vals.filter(v => v === mark).length === 2 &&
        vals.filter(v => v === "").length  === 1) {
      return line[vals.indexOf("")];
    }
  }
  return -1;
}

/* ============================================================
   HELPERS
   ============================================================ */
function checkWin(mark) {
  return WIN_LINES.some(line => line.every(i => board[i] === mark));
}

function isBoardFull() {
  return board.every(c => c !== "");
}

function endGame(msg) {
  gameOver = true;
  document.getElementById("result").textContent = msg;
}

/* ============================================================
   STATS UI
   ============================================================ */
function updateStats() {
  document.getElementById("wins").textContent   = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("draws").textContent  = draws;

  const winRate = totalGames > 0
    ? Math.round((wins / totalGames) * 100) : 0;

  document.getElementById("hsBestStreak").textContent = bestStreak;
  document.getElementById("hsTotalWins").textContent  = wins;
  document.getElementById("hsWinRate").textContent    = winRate + "%";
}

/* ============================================================
   RESTART
   ============================================================ */
function restart() {
  board    = Array(9).fill("");
  gameOver = false;
  document.getElementById("result").textContent = "";
  renderBoard();
}

/* ============================================================
   SAVE SCORE
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
   START
   ============================================================ */
renderBoard();
