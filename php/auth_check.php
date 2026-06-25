<?php
// php/auth_check.php
// ----------------------------------------------------------
// Include this at the top of protected PHP pages
// Usage:  require_once '../php/auth_check.php';
// ----------------------------------------------------------

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (empty($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: ../pages/login.html');
    exit;
}
?>
