<?php
// php/db.php

define('DB_HOST', '127.0.0.1');  // use this only
define('DB_NAME', 'gameportal');
define('DB_USER', 'root');
define('DB_PASS', '');            // empty password
define('DB_CHARSET', 'utf8mb4');

function getDB() {
    static $pdo = null;

    if ($pdo === null) {
       $dsn = 'mysql:host=' . DB_HOST . ';port=3308;dbname=' . DB_NAME . ';charset=' . DB_CHARSET;

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            die(json_encode([
                'success' => false,
                'message' => 'Database connection failed: ' . $e->getMessage()
            ]));
        }
    }

    return $pdo;
}
?>