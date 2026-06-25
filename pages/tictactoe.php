<?php
require_once '../php/auth_check.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tic Tac Toe</title>

  <!-- Correct -->
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <!-- Fixed -->
  <a href="dashboard.php" class="back-link">Back to Games</a>

  <div class="game-page">
    <h2>Tic Tac Toe</h2>
    <p style="margin-top:4px; color:var(--text-light); font-size:0.86rem;">
      You are X &nbsp;&middot;&nbsp; Computer is O
    </p>

    <div id="board"></div>

    <button class="btn btn-secondary" onclick="restart()">Restart</button>

    <p class="result-msg" id="result"></p>

    <div class="score-row" style="margin-top:16px;">
      <div class="score-badge">Wins: <span id="wins">0</span></div>
      <div class="score-badge">Losses: <span id="losses">0</span></div>
      <div class="score-badge">Draws: <span id="draws">0</span></div>
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
  <script src="../js/tictactoe.js"></script>

</body>
</html>