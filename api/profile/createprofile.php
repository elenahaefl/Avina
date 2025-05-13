<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

// DB-Verbindung
require_once '../../system/config.php';

// Logged-in user ID
$loggedInUserId = $_SESSION['user_id'];


// Insert user profile into the database
$insertStmt = $pdo->prepare("INSERT INTO user_profiles (user_id, firstname, lastname, birthdate) VALUES (:user_id, :firstname, :lastname, :birthdate)");
$insertStmt->bindParam(':user_id', $loggedInUserId, PDO::PARAM_INT);
$insertStmt->bindParam(':firstname', 'Benjamin', PDO::PARAM_STR);
$insertStmt->bindParam(':lastname', 'Example value', PDO::PARAM_STR);
$insertStmt->bindParam(':birthdate', NULL, PDO::PARAM_NULL);
$insertStmt->execute();
