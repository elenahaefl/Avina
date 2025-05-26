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

// Get the logged-in user's data
// Get the logged-in user's data including email


// Hole das Profil der Userin
$stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE user_id = ?");
$stmt->execute([$loggedInUserId]);
$profile = $stmt->fetch();


$test = $pdo->prepare("SELECT * FROM chosencategories WHERE personen_id = ?");
$test->execute([$profile["id"]]);
$chosencategories = $test->fetchAll(PDO::FETCH_ASSOC);

if ($chosencategories) {
    header('Content-Type: application/json');
    echo json_encode([
        "status" => "success",
        "chosencategories" => $chosencategories
    ]);
} else {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode(["error" => "User not found for user $loggedInUserId"]);
}
?>