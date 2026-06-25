<?php
require_once '../php/auth_check.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hangman</title>

  <!-- Correct -->
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <!-- Fixed -->
  <a href="dashboard.php" class="back-link">Back to Games</a>

  <div class="game-page">
    <h2>Hangman</h2>
    <p class="game-subtitle" style="margin-bottom:0; color:var(--text-light); font-size:0.86rem;">
      Guess the hidden word letter by letter
    </p>

    <div class="score-row" style="margin-top:18px;">
      <div class="score-badge">Attempts left: <span id="attempts">6</span></div>
      <div class="score-badge">Words solved: <span id="wordsSolved">0</span></div>
    </div>

    <div class="word-display" id="word"></div>

    <!-- Hint area -->
    <div class="hangman-hint-area" id="hintArea">
      <span class="hint-label">Hint</span>
      <p id="hintText">Loading...</p>
    </div>

    <div style="margin-top:10px;">
      <button class="btn btn-secondary" id="nextHintBtn" onclick="revealNextHint()" style="font-size:0.8rem; padding:7px 16px;">
        Reveal next hint
      </button>
      <button class="btn btn-secondary" onclick="newGame()" style="font-size:0.8rem; padding:7px 16px;">
        New word
      </button>
    </div>

    <p class="result-msg" id="result"></p>

    <!-- Keyboard -->
    <div class="keyboard" id="keyboard"></div>

    <div class="divider"></div>

    <!-- High Score Section -->
    <div class="high-score-section">
      <h4>High Scores</h4>
      <div class="score-list">
        <div class="score-entry top-entry">
          <span class="score-label">Best streak (words)</span>
          <span class="score-value" id="hsBestStreak">0</span>
        </div>
        <div class="score-entry">
          <span class="score-label">Total words solved</span>
          <span class="score-value" id="hsTotalSolved">0</span>
        </div>
        <div class="score-entry">
          <span class="score-label">Total games played</span>
          <span class="score-value" id="hsTotalPlayed">0</span>
        </div>
      </div>
    </div>

  </div>

  <!-- Correct -->
  <script src="../js/hangman.js"></script>

</body>
</html>