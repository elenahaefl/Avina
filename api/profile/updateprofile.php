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

// Read JSON input from fetch request
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['birthdate']) || !isset($input['firstname']) || !isset($input['lastname'])) {
    http_response_code(400);
    echo json_encode(["error" => "Wir brauchen dein Geburtstag."]);
    exit;
}

$birthdate = trim($input['birthdate']);

// Insert into DB
$stmt = $pdo->prepare("UPDATE user_profiles SET firstname = :firstname, lastname = :lastname, birthdate = :birthdate WHERE user_id = :user_id");
$stmt->bindParam(':user_id', $loggedInUserId, PDO::PARAM_INT);
$stmt->bindParam(':firstname', $input['firstname'], PDO::PARAM_STR);
$stmt->bindParam(':lastname', $input['lastname'], PDO::PARAM_STR);
$stmt->bindParam(':birthdate', $input['birthdate'], PDO::PARAM_STR); // Assuming birthdate is optional

try {
    $stmt->execute();
    echo json_encode(["success" => true, "message" => "Profile created."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
