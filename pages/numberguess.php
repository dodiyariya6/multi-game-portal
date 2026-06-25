<?php
require_once '../php/auth_check.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Number Guess</title>

  <!-- Correct -->
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <!-- Correct: same folder (pages/) -->
  <a href="dashboard.php" class="back-link">Back to Games</a>

  <div class="game-page">
    <h2>Number Guess</h2>
    <p style="margin-top:4px; color:var(--text-light); font-size:0.86rem;">
      I am thinking of a number between 1 and 100
    </p>

    <div class="range-pill">Current range: <span id="range">1 – 100</span></div>

    <div class="score-row">
      <div class="score-badge">Attempts: <span id="attempts">0</span></div>
      <div class="score-badge">Score: <span id="score">0</span></div>
    </div>

    <div style="display:flex; justify-content:center; gap:10px; margin:16px 0;">
      <input type="number" id="num" placeholder="?" style="width:90px;">
      <button class="btn btn-primary" onclick="check()">Guess</button>
      <button class="btn btn-secondary" onclick="restart()">Restart</button>
    </div>

    <p class="hint-msg" id="hint"></p>
    <p class="result-msg" id="result"></p>

    <div class="divider"></div>

    <!-- High Score Section -->
    <div class="high-score-section">
      <h4>High Scores</h4>
      <div class="score-list">
        <div class="score-entry top-entry">
          <span class="score-label">Best score</span>
          <span class="score-value" id="hsBestScore">0</span>
        </div>
        <div class="score-entry">
          <span class="score-label">Fewest attempts (win)</span>
          <span class="score-value" id="hsFewestAttempts">--</span>
        </div>
        <div class="score-entry">
          <span class="score-label">Games won</span>
          <span class="score-value" id="hsGamesWon">0</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Correct -->
  <script src="../js/numberguess.js"></script>

</body>
</html>