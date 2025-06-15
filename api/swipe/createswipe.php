<?php
require_once '../../system/config.php';
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$userId = $_SESSION['user_id'];

// Get the user's profile ID
$stmt = $pdo->prepare("SELECT id FROM user_profiles WHERE user_id = ?");
$stmt->execute([$userId]);
$userProfile = $stmt->fetch();

if (!$userProfile) {
    http_response_code(400);
    echo json_encode(['error' => 'User profile not found']);
    exit;
}

$profileId = $userProfile['id'];

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['activity_id'], $input['is_liked'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$activityId = (int)$input['activity_id'];
$isLiked = (int)$input['is_liked'];

// Check if this match already exists (optional, update instead)
$stmt = $pdo->prepare("SELECT id FROM matches WHERE personen_id = ? AND activity_id = ?");
$stmt->execute([$profileId, $activityId]);
$existingMatch = $stmt->fetch();

if ($existingMatch) {
    // Update existing match
    $updateStmt = $pdo->prepare("UPDATE matches SET is_liked = ? WHERE id = ?");
    $success = $updateStmt->execute([$isLiked, $existingMatch['id']]);
} else {
    // Insert new match
    $insertStmt = $pdo->prepare("INSERT INTO matches (personen_id, activity_id, is_liked) VALUES (?, ?, ?)");
    $success = $insertStmt->execute([$profileId, $activityId, $isLiked]);
}

if ($success) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
}
