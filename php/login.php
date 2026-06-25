<?php
// php/login.php
// ----------------------------------------------------------
// Handles POST from login.html
// Starts session on success
// ----------------------------------------------------------

header('Content-Type: application/json');
require_once 'db.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

$username = trim($_POST['username'] ?? '');
$password =      $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required']);
    exit;
}

// Fetch user from DB
$pdo  = getDB();
$stmt = $pdo->prepare('SELECT id, username, password FROM users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch();

// Verify password with the stored hash
if (!$user || !password_verify($password, $user['password'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    exit;
}

// Success — store user info in session
$_SESSION['user_id']   = $user['id'];
$_SESSION['username']  = $user['username'];
$_SESSION['logged_in'] = true;

echo json_encode([
    'success'  => true,
    'message'  => 'Login successful',
    'username' => $user['username'],
    'redirect' => '../pages/dashboard.php'
]);
?>
