<?php
require_once '../php/auth_check.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rock Paper Scissors</title>

  <!-- Correct -->
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <!-- ⚠️ This depends on index location -->
  <a href="dashboard.php" class="back-link">Back to Games</a>

  <div class="game-page">
    <h2>Rock Paper Scissors</h2>
    <p style="margin-top:4px; color:var(--text-light); font-size:0.86rem;">
      Choose your move to play against the computer
    </p>

    <div class="rps-options">
      <button class="rps-btn" onclick="play('rock')">Rock</button>
      <button class="rps-btn" onclick="play('paper')">Paper</button>
      <button class="rps-btn" onclick="play('scissors')">Scissors</button>
    </div>

    <div class="divider"></div>

    <p class="hint-msg" id="choices"></p>
    <p class="result-msg" id="result"></p>

    <div class="score-row" style="margin-top:16px;">
      <div class="score-badge">Score: <span id="score">0</span></div>
      <div class="score-badge">Wins: <span id="wins">0</span></div>
      <div class="score-badge">Losses: <span id="losses">0</span></div>
    </div>

    <div class="divider"></div>

    <!-- High Score Section -->
    <div class="high-score-section">
      <h4>High Scores</h4>
      <div class="score-list">
        <div class="score-entry top-entry">
          <span class="score-label">Best win streak</span>
          <span class="score-value" id="hsBestStreak">0</span>
        </div>
        <div class="score-entry">
          <span class="score-label">Total wins</span>
          <span class="score-value" id="hsTotalWins">0</span>
        </div>
        <div class="score-entry">
          <span class="score-label">Win rate</span>
          <span class="score-value" id="hsWinRate">0%</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Correct -->
  <script src="../js/rps.js"></script>

</body>
</html>