<?php
require_once '../php/auth_check.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <div class="container">
    <div class="page-header">
      <h1>Game Portal</h1>
      <p>Welcome, <strong id="usernameDisplay">Player</strong>!</p>
      <a href="../php/logout.php" class="btn btn-secondary"
         style="margin-top:10px; display:inline-block; font-size:0.8rem;">Logout</a>
    </div>

    <div class="game-grid">
      <a href="hangman.php"    class="game-card"><span class="game-abbr">HM</span><h3>Hangman</h3></a>
      <a href="sudoku.php"     class="game-card"><span class="game-abbr">SD</span><h3>Sudoku</h3></a>
      <a href="tictactoe.php"  class="game-card"><span class="game-abbr">TTT</span><h3>Tic Tac Toe</h3></a>
      <a href="rps.php"        class="game-card"><span class="game-abbr">RPS</span><h3>Rock Paper Scissors</h3></a>
      <a href="numberguess.php"class="game-card"><span class="game-abbr">NG</span><h3>Number Guess</h3></a>
      <a href="leaderboard.php"class="game-card"><span class="game-abbr">🏆</span><h3>Leaderboard</h3></a>
    </div>
  </div>

  <script>
  // Show username from sessionStorage
  const name = sessionStorage.getItem("username");
  if (name) document.getElementById("usernameDisplay").textContent = name;
  </script>

</body>
</html>
