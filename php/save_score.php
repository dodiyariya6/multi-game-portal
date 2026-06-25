<?php
// php/save_score.php
// ----------------------------------------------------------
// Called via JavaScript fetch() after a game ends
// Expects JSON body: { game_slug: 'hangman', score: 120 }
// ----------------------------------------------------------

header('Content-Type: application/json');
require_once 'db.php';

session_start();

// Must be logged in
if (empty($_SESSION['logged_in'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

// Read JSON body
$data      = json_decode(file_get_contents('php://input'), true);
$game_slug = $data['game_slug'] ?? '';
$score     = intval($data['score'] ?? 0);

if (empty($game_slug)) {
    echo json_encode(['success' => false, 'message' => 'Missing game_slug']);
    exit;
}

$pdo = getDB();

// Look up game_id from slug
$stmt = $pdo->prepare('SELECT id FROM games WHERE game_slug = ?');
$stmt->execute([$game_slug]);
$game = $stmt->fetch();

if (!$game) {
    echo json_encode(['success' => false, 'message' => 'Unknown game']);
    exit;
}

// Insert score
$stmt = $pdo->prepare(
    'INSERT INTO scores (user_id, game_id, score) VALUES (?, ?, ?)'
);
$stmt->execute([$_SESSION['user_id'], $game['id'], $score]);

echo json_encode(['success' => true, 'message' => 'Score saved!']);
?>
