<?php
require_once '../php/auth_check.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sudoku 4x4</title>

  <!-- Correct -->
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <!-- Fixed -->
  <a href="dashboard.php" class="back-link">Back to Games</a>

  <div class="game-page">
    <h2>Sudoku 4x4</h2>
    <p style="margin-top:4px; color:var(--text-light); font-size:0.86rem;">
      Click a cell, then type 1 – 4 using your keyboard
    </p>

    <div id="grid"></div>

    <div style="display:flex; justify-content:center; gap:10px; margin-top:4px;">
      <button class="btn btn-primary" onclick="check()">Check</button>
      <button class="btn btn-secondary" onclick="init()">New puzzle</button>
    </div>

    <p class="result-msg" id="result"></p>

    <div class="divider"></div>

    <!-- High Score Section -->
    <div class="high-score-section">
      <h4>High Scores</h4>
      <div class="score-list">
        <div class="score-entry top-entry">
          <span class="score-label">Puzzles solved</span>
          <span class="score-value" id="hsPuzzlesSolved">0</span>
        </div>
        <div class="score-entry">
          <span class="score-label">Current streak</span>
          <span class="score-value" id="hsCurrentStreak">0</span>
        </div>
        <div class="score-entry">
          <span class="score-label">Best streak</span>
          <span class="score-value" id="hsBestStreak">0</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Correct -->
  <script src="../js/sudoku.js"></script>

</body>
</html>