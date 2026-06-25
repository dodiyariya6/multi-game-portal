<?php
require_once '../php/auth_check.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Leaderboard</title>
  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

<a href="dashboard.php" class="back-link">Back</a>

<div class="game-page">
  <h2>Leaderboard</h2>

  <!-- Game Selector -->
  <select id="gameSelect" onchange="loadLeaderboard()">
    <option value="hangman">Hangman</option>
    <option value="sudoku">Sudoku</option>
    <option value="tictactoe">Tic Tac Toe</option>
    <option value="rps">Rock Paper Scissors</option>
    <option value="numberguess">Number Guess</option>
  </select>

  <div class="divider"></div>

  <!-- Leaderboard Table -->
  <table style="width:100%; text-align:center;">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody id="leaderboardBody">
      <tr><td colspan="3">Loading...</td></tr>
    </tbody>
  </table>
</div>

<script>
async function loadLeaderboard() {
  const game = document.getElementById("gameSelect").value;

  const res = await fetch(`../php/get_leaderboard.php?game=${game}`);
  const data = await res.json();

  const tbody = document.getElementById("leaderboardBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = "<tr><td colspan='3'>No scores yet</td></tr>";
    return;
  }

  data.forEach((row, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${row.username}</td>
      <td>${row.score}</td>
    `;

    tbody.appendChild(tr);
  });
}

// Load default on page open
window.onload = loadLeaderboard;
</script>

</body>
</html>