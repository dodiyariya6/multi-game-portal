<?php
// php/register.php
// ----------------------------------------------------------
// Handles POST request from register.html
// Returns JSON response
// ----------------------------------------------------------

header('Content-Type: application/json');
require_once 'db.php';

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Collect and sanitize inputs
$username = trim($_POST['username'] ?? '');
$email    = trim($_POST['email']    ?? '');
$password =      $_POST['password'] ?? '';
$confirm  =      $_POST['confirm']  ?? '';

// ── Validation ────────────────────────────────────────────
if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit;
}

if ($password !== $confirm) {
    echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
    exit;
}

// ── Check for existing username / email ───────────────────
$pdo  = getDB();
$stmt = $pdo->prepare('SELECT id FROM users WHERE username = ? OR email = ?');
$stmt->execute([$username, $email]);

if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Username or email already taken']);
    exit;
}

// ── Hash password & insert ────────────────────────────────
$hashed = password_hash($password, PASSWORD_BCRYPT);

$stmt = $pdo->prepare(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
);
$stmt->execute([$username, $email, $hashed]);

echo json_encode(['success' => true, 'message' => 'Registration successful! Please log in.']);
?>
