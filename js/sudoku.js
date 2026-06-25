/* ============================================================
   SUDOKU 4x4 — Valid puzzle generation via backtracking
   Rules: each row, column, and 2x2 box contains 1-4 exactly once
   ============================================================ */

/* ============================================================
   STATE
   ============================================================ */
let solution       = [];   // full solved grid
let puzzle         = [];   // grid with blanks (0)

let puzzlesSolved  = 0;
let currentStreak  = 0;
let bestStreak     = 0;

/* ============================================================
   GENERATOR — backtracking with shuffle
   ============================================================ */
function isSafe(grid, row, col, num) {
  /* check row */
  for (let c = 0; c < 4; c++) {
    if (grid[row][c] === num) return false;
  }
  /* check column */
  for (let r = 0; r < 4; r++) {
    if (grid[r][col] === num) return false;
  }
  /* check 2x2 box */
  const boxR = row - (row % 2);
  const boxC = col - (col % 2);
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      if (grid[boxR + r][boxC + c] === num) return false;
    }
  }
  return true;
}

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fillGrid(grid) {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] !== 0) continue;
      for (const num of shuffled([1, 2, 3, 4])) {
        if (isSafe(grid, row, col, num)) {
          grid[row][col] = num;
          if (fillGrid(grid)) return true;
          grid[row][col] = 0;
        }
      }
      return false;   /* backtrack */
    }
  }
  return true;
}

function generatePuzzle() {
  /* 1. Build a complete valid solution */
  const base = Array.from({ length: 4 }, () => Array(4).fill(0));
  fillGrid(base);
  solution = base.map(r => [...r]);

  /* 2. Make a copy and remove exactly 6 random cells */
  puzzle = solution.map(r => [...r]);
  const allCells = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      allCells.push([r, c]);

  const toRemove = shuffled(allCells).slice(0, 6);
  toRemove.forEach(([r, c]) => { puzzle[r][c] = 0; });
}

/* ============================================================
   RENDER
   ============================================================ */
function renderGrid() {
  const container = document.getElementById("grid");
  container.innerHTML = "";

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const input           = document.createElement("input");
      input.type            = "text";
      input.maxLength       = 1;
      input.dataset.row     = r;
      input.dataset.col     = c;
      input.autocomplete    = "off";

      if (puzzle[r][c] !== 0) {
        input.value    = puzzle[r][c];
        input.disabled = true;
      } else {
        input.addEventListener("keydown", handleKeydown);
        input.addEventListener("input",   handleInput);
      }

      container.appendChild(input);
    }
  }
}

/* ============================================================
   INPUT HANDLING
   ============================================================ */
function handleInput(e) {
  /* allow only digits 1-4 */
  e.target.value = e.target.value.replace(/[^1-4]/g, "").slice(-1);
  e.target.classList.remove("correct", "wrong");
  document.getElementById("result").textContent = "";
}

function handleKeydown(e) {
  const allowed = ["1","2","3","4","Backspace","Delete","Tab",
                   "ArrowLeft","ArrowRight","ArrowUp","ArrowDown"];
  if (!allowed.includes(e.key)) { e.preventDefault(); return; }

  if (["1","2","3","4"].includes(e.key)) {
    e.preventDefault();
    e.target.value = e.key;
    e.target.classList.remove("correct", "wrong");
    document.getElementById("result").textContent = "";
  }

  if (e.key.startsWith("Arrow")) {
    e.preventDefault();
    navigateTo(e.target, e.key);
  }
}

function navigateTo(input, direction) {
  const r = +input.dataset.row;
  const c = +input.dataset.col;
  let nr = r, nc = c;

  if (direction === "ArrowRight") nc = (c + 1) % 4;
  if (direction === "ArrowLeft")  nc = (c + 3) % 4;
  if (direction === "ArrowDown")  nr = (r + 1) % 4;
  if (direction === "ArrowUp")    nr = (r + 3) % 4;

  const target = document.querySelector(
    `#grid input[data-row="${nr}"][data-col="${nc}"]`
  );
  if (target && !target.disabled) target.focus();
}

/* ============================================================
   CHECK
   ============================================================ */
function check() {
  const inputs = document.querySelectorAll("#grid input");
  let allCorrect = true;

  inputs.forEach(input => {
    const r   = +input.dataset.row;
    const c   = +input.dataset.col;
    const val = parseInt(input.value, 10);

    input.classList.remove("correct", "wrong");

    if (val !== solution[r][c]) {
      input.classList.add("wrong");
      allCorrect = false;
    } else {
      input.classList.add("correct");
    }
  });

  if (allCorrect) {
    document.getElementById("result").textContent = "Perfect solution! 🎉";
    puzzlesSolved++;
    currentStreak++;
    if (currentStreak > bestStreak) bestStreak = currentStreak;
    updateHighScoreUI();
    saveScore("sudoku", puzzlesSolved * 20);
  } else {
    document.getElementById("result").textContent =
      "Some cells are incorrect. Keep going!";
    /* do NOT reset streak on a failed check — only reset on new puzzle start */
  }
}

/* ============================================================
   HIGH SCORE UI
   ============================================================ */
function updateHighScoreUI() {
  document.getElementById("hsPuzzlesSolved").textContent = puzzlesSolved;
  document.getElementById("hsCurrentStreak").textContent = currentStreak;
  document.getElementById("hsBestStreak").textContent    = bestStreak;
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
   INIT
   ============================================================ */
function init() {
  generatePuzzle();
  renderGrid();
  document.getElementById("result").textContent = "";
  updateHighScoreUI();
}

/* ============================================================
   START
   ============================================================ */
window.onload = init;
