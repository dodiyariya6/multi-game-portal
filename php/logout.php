<?php
// php/logout.php
// ----------------------------------------------------------
// Destroys the session and redirects to login page
// ----------------------------------------------------------

session_start();
session_unset();
session_destroy();

// Redirect to login page
header('Location: ../pages/login.html');
exit;
?>
