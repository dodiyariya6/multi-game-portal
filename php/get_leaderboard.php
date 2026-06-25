<?php
// php/get_leaderboard.php
// ----------------------------------------------------------
// Returns TOP scores per user (1 entry per user per game)
// Sorted by highest score (descending)
// ----------------------------------------------------------

header('Content-Type: application/json');
require_once 'db.php';

// Get game from URL
$game_slug = trim($_GET['game'] ?? '');

if (empty($game_slug)) {
    echo json_encode([]);
    exit;
}

try {
    $pdo = getDB();

    // Get highest score per user for selected game
    $sql = "
        SELECT u.username, MAX(s.score) AS score
        FROM scores s
        JOIN users u ON s.user_id = u.id
        JOIN games g ON s.game_id = g.id
        WHERE g.game_slug = ?
        GROUP BY s.user_id
        ORDER BY score DESC
        LIMIT 10
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$game_slug]);

    $rows = $stmt->fetchAll();

    echo json_encode($rows);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>